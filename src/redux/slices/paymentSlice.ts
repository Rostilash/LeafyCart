import { createSlice } from "@reduxjs/toolkit";

export interface PaymentState {
  loading: boolean;
  error: {} | string | null;
  liqpayData: { data: string; signature: string } | null;
}
export interface PaymentProps {
  amount: number;
  name: string;
  email: string;
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
});

export default paymentSlice.reducer;
