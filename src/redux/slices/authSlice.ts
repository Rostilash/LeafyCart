import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../fireBase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

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
  loading: false,
  error: null,
};

// Registration
export const registerUser = createAsyncThunk("auth/register", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    if (password.length < 6) {
      return thunkAPI.rejectWithValue("Password must be at least 6 characters");
    }

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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🔴 Exit
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Save order
export const saveOrder = createAsyncThunk(
  "auth/saveOrder",
  async (form: { name: string; email: string; address: string; price: number }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) return thunkAPI.rejectWithValue("Користувач не авторизований");

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        ...form,
        createdAt: serverTimestamp(),
      });

      return "ok";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Check out user
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
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
  reducers: {},
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

      // SaveOrder
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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

export default authSlice.reducer;
