import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FoodProduct, ProductState } from "../../types/productTypes";
import { addDoc, updateDoc, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import { collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../fireBase/config";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<FoodProduct[]>("products/getAll", async (_, thunkAPI) => {
  try {
    const snapshot = await getDocs(collection(db, "products"));

    const products: FoodProduct[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      let createdAt: string | null = null;
      const rawCreatedAt = data.createdAt;

      // If Timestamp Firestore — changing
      if (rawCreatedAt instanceof Timestamp) {
        createdAt = rawCreatedAt.toDate().toISOString();
      }

      return {
        id: docSnap.id,
        ...data,
        createdAt,
      } as FoodProduct;
    });

    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async (productData: Omit<FoodProduct, "id" | "createdAt">, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: serverTimestamp(),
    });
    const addedDoc = await getDoc(docRef);
    const data = addedDoc.data();

    return {
      id: addedDoc.id,
      ...data,
      createdAt: data?.createdAt?.toDate().toISOString() ?? null,
    } as FoodProduct;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (updatedProduct: FoodProduct, thunkAPI) => {
  try {
    const { id, ...rest } = updatedProduct;
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, rest);

    return updatedProduct;
  } catch (error: any) {
    console.log("Щось пішло не так");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (productId: string, thunkAPI) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return productId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<FoodProduct | null>) => {
      state.selectedProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      state.products.sort((a, b) => (action.payload === "asc" ? a.price - b.price : b.price - a.price));
    },
  },
  extraReducers(builder) {
    builder
      // getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        // state.products = action.payload;
        const existingIds = new Set(state.products.map((p) => p.id));
        const newProducts = action.payload.filter((p) => !existingIds.has(p.id));
        state.products = [...state.products, ...newProducts];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
