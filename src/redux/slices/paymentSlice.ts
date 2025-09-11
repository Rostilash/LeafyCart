import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  loading: boolean;
  error: {} | string | null;
  liqpayData: { data: string; signature: string } | null;
  cities: string[];
  nova_adress: string;
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
  cities: [],
  nova_adress: "",
};

export const fetchCities = createAsyncThunk("payment/fetchCities", async (query: string) => {
  const response = await fetch("/api", {
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
    const response = await fetch("/api", {
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- обробка fetchCities ---
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
        state.error = "Не вдалося завантажити міста";
      })

      .addCase(fetchWerhouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWerhouses.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.nova_adress = action.payload;
      })
      .addCase(fetchWerhouses.rejected, (state) => {
        state.loading = false;
        state.error = "Не вдалося завантажити міста";
      });
  },
});

export default paymentSlice.reducer;
