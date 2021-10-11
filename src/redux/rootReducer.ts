import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import reviewReducer from "./reviewsSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  productsReducer,
  reviewReducer,
  userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
