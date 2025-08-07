import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../fireBase/config";

export interface PaymentState {
  loading: boolean;
  error: string | null;
  liqpayData: { data: string; signature: string } | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  liqpayData: null,
};

export interface PaymentProps {
  amount: number;
  name: string;
  email: string;
}

export const createLiqPayPayment = createAsyncThunk("payment/createLiqPayPayment", async ({ amount, name, email }: PaymentProps, thunkAPI) => {
  try {
    const payment = httpsCallable(functions, "createLiqPayPayment");
    const result: any = await payment({ amount, name, email });
    return result.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Помилка оплати");
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLiqPayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.liqpayData = null;
      })
      .addCase(createLiqPayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.liqpayData = action.payload;
      })
      .addCase(createLiqPayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
