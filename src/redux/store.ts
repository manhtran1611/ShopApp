import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
store.subscribe(
  throttle(() => {
    saveState({
      cartReducer: store.getState().cartReducer,
    });
  }, 5000)
);

export default store;

export type AppDispatch = typeof store.dispatch;
