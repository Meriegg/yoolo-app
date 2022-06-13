import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
