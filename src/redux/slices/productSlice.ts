import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FoodProduct, ProductState } from "../../types/productTypes";
import {
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  collection,
  serverTimestamp,
  Timestamp,
  runTransaction,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fireBase/config";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

interface GetProductByIdArgs {
  productId: string;
  userId?: string | null;
}

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Error fetching products:", error);
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
});

export const getProductById = createAsyncThunk<FoodProduct, GetProductByIdArgs>("products/getById", async ({ productId, userId }, thunkAPI) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Product not found");
    }

    const data = docSnap.data();

    let createdAt: string | null = null;
    const rawCreatedAt = data.createdAt;

    if (rawCreatedAt instanceof Timestamp) {
      createdAt = rawCreatedAt.toDate().toISOString();
    }

    let userRating: number | null = null;

    if (userId) {
      const ratingsSnap = await getDocs(query(collection(db, "ratings"), where("userId", "==", userId), where("productId", "==", productId)));

      ratingsSnap.forEach((r) => {
        const rData = r.data();
        if (typeof rData.rating === "number") {
          userRating = rData.rating;
        }
      });
    }

    return {
      id: docSnap.id,
      ...data,
      userRating,
      createdAt,
    } as FoodProduct;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Error fetching product:", error);
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
});

export const fetchUserRating = async (userId: string, productId: string) => {
  const ratingRef = doc(db, "ratings", `${userId}_${productId}`);
  const ratingSnap = await getDoc(ratingRef);

  if (ratingSnap.exists()) {
    const data = ratingSnap.data();
    if (typeof data.rating === "number") {
      return data.rating;
    }
  }
  return 0;
};

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Error fetching products:", error);
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (updatedProduct: FoodProduct, thunkAPI) => {
  try {
    const { id, ...rest } = updatedProduct;
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, rest);

    return updatedProduct;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Error fetching products:", error);
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (productId: string, thunkAPI) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return productId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Error fetching products:", error);
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
});

export const rateProduct = createAsyncThunk(
  "product/rateProduct",
  async ({ productId, rating, userId }: { productId: string; rating: number; userId: string }, thunkApi) => {
    try {
      const productRef = doc(db, "products", productId);
      const ratingRef = doc(db, "ratings", `${userId}_${productId}`); // uniq keys for tables

      await runTransaction(db, async (transaction) => {
        const productDoc = await transaction.get(productRef);
        if (!productDoc.exists()) throw new Error("Product not found");

        const data = productDoc.data();
        const currentRating = data?.rating ?? 0;
        const currentCount = data?.ratingCount ?? 0;

        const newCount = currentCount + 1;
        const newRating = (currentRating * currentCount + rating) / newCount;

        // refresh product statistics
        transaction.update(productRef, {
          rating: newRating,
          ratingCount: newCount,
        });

        // Save user
        transaction.set(ratingRef, {
          userId,
          productId,
          rating,
          createdAt: serverTimestamp(),
        });
      });

      return { productId, rating };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

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
