import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import API from "../axios";
import { InputUser } from "../interface";
import ProductDataService from "../services/index";
import { RootState } from "./rootReducer";

interface UserState {
  status: "idle" | "succeeded" | "failed";
  error: string | undefined;
}

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null || undefined,
} as UserState);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: InputUser) => {
    const response = await ProductDataService.registerUser(user);
    API.defaults.headers.common = { Authorization: response.data.token };
    return response.data.token;
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: InputUser) => {
    const response = await ProductDataService.loginUser(user);
    API.defaults.headers.common = { Authorization: response.data.token };
    return response.data.token;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.addOne(state, action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.addOne(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.status = "idle";
      });
  },
});

export default userSlice.reducer;

export const { selectAll: selectUser } = userAdapter.getSelectors(
  (state: RootState) => state.userReducer
);
