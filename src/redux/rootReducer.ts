import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import reviewReducer from "./reviewsSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  productsReducer,
  reviewReducer,
  userReducer,
  cartReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
