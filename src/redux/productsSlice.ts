import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import ProductDataService from "../services";
import { Product, Filter } from "../interface";
import { RootState } from "./rootReducer";

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
  "products/getAllProducts",
  async (page: string) => {
    const response = await ProductDataService.getAllProduct(page);
    return response.data.product;
  }
);

export const findProduct = createAsyncThunk(
  "products/find",
  async (filter: Filter) => {
    const response = await ProductDataService.findProducts(filter);
    console.log(response.data);
    return response.data.product;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/getProductById",
  async (id: string) => {
    const response = await ProductDataService.getProductById(id);
    // console.log(response.data);
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addProduct",
  async (initialProduct: Product) => {
    const response = await ProductDataService.addProduct(initialProduct);
    console.log(response.data);
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const response = await ProductDataService.deleteProduct(id);
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(findProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.updateMany(state, action.payload);
      })
      .addCase(findProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.status = "idle";
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
