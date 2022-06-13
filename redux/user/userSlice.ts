import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { UserType } from "../../types/index";

interface SetStatePayload {
  userData: UserType;
}

interface SliceState {
  value: {
    userData: UserType | null;
  };
}

const initialState: SliceState = {
  value: {
    userData: null,
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setData: (state: SliceState, payload: PayloadAction<SetStatePayload>) => {
      state.value.userData = payload.payload.userData;
    },

    clearData: (state: SliceState) => {
      state.value.userData = null;
    },
  },
});

export const { clearData, setData } = userSlice.actions;
export default userSlice.reducer;
