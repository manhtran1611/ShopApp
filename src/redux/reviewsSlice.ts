import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Review } from "../interface";
import ProductDataService from "../services/index";
import { RootState } from "./rootReducer";
interface ReviewState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const reviewsAdapter = createEntityAdapter<Review>({
  selectId: (review) => review._id,
});

const initialState = reviewsAdapter.getInitialState({
  status: "idle",
  error: null || undefined,
} as ReviewState);

export const fetchReviews = createAsyncThunk(
  "reviews/getReview",
  async (productId: string) => {
    const response = await ProductDataService.getReviews(productId);
    console.log(response.data);
    return response.data.reviews;
  }
);

export const postReview = createAsyncThunk(
  "reviews/postReview",
  async ({ productId, review }: { productId: string; review: Review }) => {
    const response = await ProductDataService.postReview(productId, review);
    console.log(response.data);
    return response.data;
  }
);
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({
    productId,
    reviewId,
    review,
  }: {
    productId: string;
    reviewId: string;
    review: Review;
  }) => {
    const response = await ProductDataService.updateReview(
      productId,
      reviewId,
      review
    );
    console.log(response.data);
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async ({ productId, reviewId }: { productId: string; reviewId: string }) => {
    const response = await ProductDataService.deleteReview(productId, reviewId);
    console.log(response.data);
    return response.data;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        reviewsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;

export const { selectAll: selectAllReviews } = reviewsAdapter.getSelectors(
  (state: RootState) => state.reviewReducer
);
