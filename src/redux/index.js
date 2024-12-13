import { configureStore } from "@reduxjs/toolkit";
import token from "./slices/token-slice";

const store = configureStore({
  reducer: {
    token,
  },
});

export default store;
