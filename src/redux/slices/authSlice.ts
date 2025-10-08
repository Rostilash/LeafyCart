import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { auth, db } from "../../fireBase/config";
import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  updatePassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  EmailAuthProvider,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { validatePassword } from "../../utils/validateOrderForm";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role: string | null;
}
export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

// Registration
export const registerUser = createAsyncThunk("auth/register", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const newObj = {
      uid: user.uid,
      email: user.email,
      role: "user",
      displayName: user.displayName,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), newObj);
    return { user: newObj };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue("Цей email вже використовується");
    }

    if (error === "auth/email-already-in-use") {
      return thunkAPI.rejectWithValue("Цей email вже використовується");
    }
    if (error === "auth/invalid-email") {
      return thunkAPI.rejectWithValue("Некоректний формат email");
    }
    if (error === "auth/weak-password") {
      return thunkAPI.rejectWithValue("Занадто слабкий пароль");
    }

    return thunkAPI.rejectWithValue(String(error));
  }
});

// 🔵 Login
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role,
      },
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };

    if (firebaseError.code === "auth/wrong-password") {
      return thunkAPI.rejectWithValue("Невірний пароль");
    }
    if (firebaseError.code === "auth/user-not-found") {
      return thunkAPI.rejectWithValue("Користувач не знайдений");
    }
    if (firebaseError.code === "auth/invalid-credential") {
      return thunkAPI.rejectWithValue("Невірний пароль");
    }

    return thunkAPI.rejectWithValue(firebaseError.message || "Сталася помилка");
  }
});

// 🟢 Login for Google
export const loginWithGoogle = createAsyncThunk("auth/googleLogin", async (_, thunkAPI) => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue("Відбулася помилка при вході...");
    }
    // return thunkAPI.rejectWithValue(String(error));
    return thunkAPI.rejectWithValue("Відбулася помилка при вході...");
  }
});

// Сange password
export const changeUserPassword = createAsyncThunk<string, { oldPassword: string; newPassword: string }, { rejectValue: string }>(
  "auth/changeUserPassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("Користувач не знайдений");

      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      return "Пароль успішно змінено ✅";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔴 Exit
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

// Check out user
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return new Promise<AuthUser | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const role = userDoc.exists() ? userDoc.data().role : "user";

          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role,
          });
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
    });
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Google login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })

      // Checkout user
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setError, clearError } = authSlice.actions;

export default authSlice.reducer;
