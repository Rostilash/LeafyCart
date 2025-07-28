import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FoodProduct, ProductState } from "../../types/productTypes";
import { addDoc, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../fireBase/config";

const initialState: ProductState = {
  products: [
    {
      id: 1,
      name: "Vegan Pizza",
      category: "Готові страви",
      description: "Органічна гречана крупа, вирощена без пестицидів.",
      price: 18000,
      weight: "500 г",
      available: true,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Grilled chicken",
      category: "Готові страви",
      description: "Органічна гречана крупа, вирощена без пестицидів.",
      price: 15000,
      weight: "500 г",
      available: true,
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Mixed Vegetables",
      category: "Готові страви",
      description: "Органічна гречана крупа, вирощена без пестицидів.",
      price: 10000,
      weight: "1 кг",
      available: true,
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Fresh Avocados",
      category: "Готові страви",
      description: "Органічна гречана крупа, вирощена без пестицидів.",
      price: 25000,
      weight: "1 кг",
      available: true,
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Гречка",
      category: "Крупи",
      description: "Органічна гречана крупа, вирощена без пестицидів.",
      price: 3999,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDGnxK8JICG7L16tjgZFfUsZPzj9Z6EhYZHA&s",
      weight: "1 кг",
      available: true,
      isNew: true,
      isRecommended: true,
      tags: ["органічне", "без глютену"],
      nutritionFacts: {
        calories: 330,
        protein: 13,
        fat: 3.4,
        carbs: 70,
      },
    },
    {
      id: 6,
      name: "Молоко 2.5%",
      category: "Молочні продукти",
      description: "Свіже фермерське молоко, пастеризоване.",
      price: 2099,
      isNew: true,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1PF2-XgCmlQvcAbL0hJIezdctrxJjKNjDA&s",
      weight: "1 л",
      available: true,
    },
    {
      id: 7,
      name: "Картопля",
      category: "Овочі",
      description: "Свіжа фермерська картопля.",
      price: 2599,
      isNew: true,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgnwr53FSfM_L9MeRYpB-7AMz4-8IAq_ulA&s",
      weight: "1 кг",
      available: true,
    },
  ],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async (productData: FoodProduct, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, "products"), { ...productData, createdAt: new Date() });
    return { docRefId: docRef.id, ...productData };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product: any, thunkAPI) => {
  try {
    await setDoc(doc(db, "products", product.id), product);
    return product;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (productId: string, thunkAPI) => {
  try {
    await deleteDoc(doc(db, "product", productId));
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
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
