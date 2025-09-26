import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../fireBase/config";
import { collection, where, query, updateDoc, doc, getDoc, getDocs, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import type { CartItem } from "../../types/cartTypes";
import { signInAnonymously } from "firebase/auth";
import { generateDataAndSignature, liqPayPromise } from "../../utils/liqpay";

// ---------------- TYPES ----------------
export interface OrderFormData {
  name: string;
  email: string;
  warehouse: string;
  city: string;
  cityRef: string;
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
  user_orders: OrderType[];
  successMessage: string | null;
}

// ---------------- INITIAL STATE ----------------
const initialState: OderState = {
  loading: false,
  error: null,
  successMessage: "",
  all_orders: [],
  user_orders: [],
};

function normalizeOrder(id: string, data: any): OrderType {
  return {
    id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
  } as OrderType;
}

const LIQPAY_PUBLIC = "";
const LIQPAY_PRIVATE = "";
const BASE_URL = process.env.NODE_ENV === "production" ? "https://leafycart-shop.web.app/" : "http://localhost:3000";

// ---------------- THUNKS ----------------
export const getAllOrders = createAsyncThunk<OrderType[], void, { rejectValue: string }>("orders/getAllOrders", async (_, thunkAPI) => {
  try {
    const q = query(collection(db, "orders"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => normalizeOrder(doc.id, doc.data()))
      .sort((a, b) => Date.parse(b.createdAt ?? "") - Date.parse(a.createdAt ?? ""));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

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

    // Need to change it for OrderBy by desc -> from FireBase latter
    return orders.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const updateOrderStatus = createAsyncThunk<OrderType, { id: string; status: string }, { rejectValue: string }>(
  "orders/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status });

      const updatedDoc = await getDoc(orderRef);
      const data = updatedDoc.data();
      if (!data) throw new Error("Order not found");

      return normalizeOrder(updatedDoc.id, data);
    } catch (error: unknown) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
);

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
      ...form,
      userId: user.uid,
      paymentId: form.paymentId || null,
      paymentStatus: form.paymentStatus || "pending",
      status: "Нове замовлення",
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

export const processLiqPay = createAsyncThunk<
  OrderType,
  { formData: OrderFormData; cartItems: CartItem[]; totalSummary: number },
  { rejectValue: string }
>("orders/processLiqPay", async ({ formData, cartItems, totalSummary }, thunkAPI) => {
  try {
    const params = {
      version: "3",
      action: "pay",
      amount: Number(totalSummary).toFixed(2),
      currency: "UAH",
      description: "Тестова оплата",
      order_id: `order_${Date.now()}`,
      result_url: `${BASE_URL}/success`,
      server_url: `${BASE_URL}/callback`,
      sandbox: "1",
    };

    const { data, signature } = generateDataAndSignature(params, LIQPAY_PRIVATE, LIQPAY_PUBLIC);

    const response = await liqPayPromise(data, signature);

    const newOrder = {
      ...formData,
      cartItems,
      price: totalSummary,
      paymentId: response.payment_id || null,
      paymentStatus: response.status,
      paymentMethod: "liqpay",
    };

    const docRef = await addDoc(collection(db, "orders"), newOrder);
    return normalizeOrder(docRef.id, newOrder);
  } catch (err) {
    return thunkAPI.rejectWithValue("LiqPay payment failed");
  }
});

// ---------------- SLICE ----------------
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
        state.user_orders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // get all Orders for admin
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.all_orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Uppdate orders
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.all_orders = state.all_orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
        state.user_orders = state.user_orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
      });
  },
});

export default orderSlice.reducer;
