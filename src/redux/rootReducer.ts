import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import reviewReducer from "./reviewsSlice";
const rootReducer = combineReducers({
  productsReducer,
  reviewReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
