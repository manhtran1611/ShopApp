import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import ProductDataService from "../../services/products";
import { Product } from "../../app/interface";
import { RootState } from "../../app/rootReducer";

interface ProductState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  status: "idle",
  error: null || undefined,
} as ProductState);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await ProductDataService.getAllProduct();
    console.log(response.data);
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addProduct",
  async (initialProduct: Product) => {
    const response = await ProductDataService.addProduct(initialProduct);
    console.log(response);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (initialProduct: Product) => {
    const response = await ProductDataService.updateProduct(
      initialProduct._id,
      initialProduct
    );
    console.log(response);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewProduct.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   productsAdapter.addOne;
    // });
  },
});

export default productsSlice.reducer;

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state: RootState) => state.productsReducer);
