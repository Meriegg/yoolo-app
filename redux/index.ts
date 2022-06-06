import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
