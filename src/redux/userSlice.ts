import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../axios";
import { InputUser, OutputUser } from "../interface";
import ProductDataService from "../services/index";
import { RootState } from "./rootReducer";
interface UserState {
  status: "idle" | "succeeded" | "failed";
  error: string | undefined;
}
interface ValidationErrors {
  error: string;
  field_errors: Record<string, string>;
}

interface Response {
  status: string;
  user: OutputUser;
  token: string;
}

const userAdapter = createEntityAdapter<OutputUser>({
  selectId: (user) => user._id,
});

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null || undefined,
} as UserState);

export const registerUser = createAsyncThunk<
  Response,
  InputUser,
  { rejectValue: ValidationErrors }
>("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await ProductDataService.registerUser(user);
    const token = response.data.token;
    API.defaults.headers.common = { Authorization: token };
    window.localStorage.setItem("token", token);
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    // console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk<
  Response,
  InputUser,
  { rejectValue: ValidationErrors }
>("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await ProductDataService.loginUser(user);
    const token = response.data.token;
    API.defaults.headers.common = { Authorization: token };
    window.localStorage.setItem("token", token);

    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await ProductDataService.logoutUser();
  window.localStorage.clear();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.addOne(state, action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.addOne(state, action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.removeAll(state);
        state.status = "idle";
      })
      .addCase(logoutUser.rejected, (state, action) => {
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
