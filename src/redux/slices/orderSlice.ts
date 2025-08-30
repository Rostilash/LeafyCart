import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../fireBase/config";
import { collection, where, query, getDocs, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import type { CartItem } from "../../types/cartTypes";
import { signInAnonymously } from "firebase/auth";

export interface OrderFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  payment: string;
  last_name: string;
  mid_name: string;
  phone_number: string;
}

export interface OrderType extends OrderFormData {
  id: string;
  userId: string;
  price: number;
  cartItems: CartItem[];
  paymentId: string | null;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

export interface OderState {
  loading: boolean;
  error: string | { message: string } | null;
  all_orders: OrderType[];
  successMessage: string | null;
}

const initialState: OderState = {
  loading: false,
  error: null,
  successMessage: "",
  all_orders: [],
};

export const getOrdersByUser = createAsyncThunk<OrderType[], string, { rejectValue: string }>("orders/getByUser", async (userId, thunkAPI) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const orders: OrderType[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      let createdAt: string | null = null;
      if (data.createdAt instanceof Timestamp) {
        createdAt = data.createdAt.toDate().toISOString();
      }

      return {
        id: doc.id,
        ...data,
        createdAt,
      } as OrderType;
    });

    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const saveOrder = createAsyncThunk<
  string,
  OrderFormData & {
    price: number;
    cartItems: any[];
    paymentId?: string;
    paymentStatus?: string;
  },
  { rejectValue: string }
>("orders/saveOrder", async (form, thunkAPI) => {
  try {
    const user = auth.currentUser || (await signInAnonymously(auth)).user;
    if (!user) return thunkAPI.rejectWithValue("Користувач не авторизований");

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      name: form.name,
      email: form.email,
      city: form.city,
      payment: form.payment,
      address: form.address,
      price: form.price,
      cartItems: form.cartItems,
      paymentId: form.paymentId || null,
      paymentStatus: form.paymentStatus || "pending",
      status: "new",
      createdAt: serverTimestamp(),
    });

    return "ok";
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Save order
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(saveOrder.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Ваше замовлення успішно оформлене!";
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Не вдалося зберегти замовлення";
      })

      // All getOrdersByUser
      .addCase(getOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.all_orders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default orderSlice.reducer;
