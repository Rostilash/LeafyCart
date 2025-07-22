import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../fireBase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";

export interface AuthState {
  user: User | null;
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
    return res.user;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🔵 Login
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🟢 Login for Google
export const loginWithGoogle = createAsyncThunk("auth/googleLogin", async (_, thunkAPI) => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🔴 Exit
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
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
        state.user = action.payload;
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
        state.user = action.payload;
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
        state.user = action.payload;
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
      });
  },
});

export default authSlice.reducer;
