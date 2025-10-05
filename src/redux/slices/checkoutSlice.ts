import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ---------------- TYPES ----------------
export interface PaymentProps {
  amount: number;
  name: string;
  email: string;
}
export interface Warehouse {
  description: string;
  ref: string;
  latitude?: number;
  longitude?: number;
}
export interface PaymentState {
  loading: boolean;
  loadingWarehouses: boolean;
  error: {} | string | null;
  liqpayData: { data: string; signature: string } | null;
  cities: Warehouse[];
  nova_adress: Warehouse[];
}

// ---------------- INITIAL STATE ----------------
const initialState: PaymentState = {
  loading: false,
  loadingWarehouses: false,
  error: null,
  liqpayData: null,
  cities: [],
  nova_adress: [],
};

const API_BASE = import.meta.env.DEV ? "/api/np" : "https://nova-poshta-worker.leafy-cart.workers.dev/api/np";

// ---------------- THUNKS ----------------
export const fetchCities = createAsyncThunk("payment/fetchCities", async (query: string) => {
  const response = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: { FindByString: query, Page: "1" },
    }),
  });
  const data = await response.json();
  return data.data.map((city: any) => ({
    description: city.Description,
    ref: city.Ref,
  }));
});

export const fetchWerhouses = createAsyncThunk("payment/fetchWerhouses", async (cityRef: string) => {
  try {
    const response = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: { CityRef: cityRef },
      }),
    });
    const data = await response.json();
    return data.data.map((wh: any) => ({
      description: wh.Description,
      ref: wh.Ref,
    }));
  } catch (error) {
    throw error;
  }
});

// ---------------- SLICE ----------------
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---  fetchCities ---
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<{ description: string; ref: string }[]>) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
        state.error = "Не вдалося завантажити міста";
      })
      // ---  fetchWerhouses ---
      .addCase(fetchWerhouses.pending, (state) => {
        state.loadingWarehouses = true;
        state.error = null;
      })
      .addCase(fetchWerhouses.fulfilled, (state, action: PayloadAction<Warehouse[]>) => {
        state.loadingWarehouses = false;
        state.nova_adress = action.payload;
      })
      .addCase(fetchWerhouses.rejected, (state) => {
        state.loadingWarehouses = false;
        state.error = "Не вдалося завантажити адреси";
      });
  },
});

export default paymentSlice.reducer;
