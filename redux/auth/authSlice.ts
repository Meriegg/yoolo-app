import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
interface SliceState {
  value: {
    accessToken: string | null;
  };
}

interface SetTokenPayload {
  accessToken: string;
}

const initialState: SliceState = {
  value: {
    accessToken: null,
  },
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setToken: (state: SliceState, payload: PayloadAction<SetTokenPayload>) => {
      state.value.accessToken = payload.payload.accessToken;
    },

    removeToken: (state: SliceState) => {
      state.value.accessToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
