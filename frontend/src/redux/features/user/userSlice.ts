import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthSuccessRes, IAuthErrorRes } from "@shared/types/auth";

interface IUserState {
  currentUser: IAuthSuccessRes | null;
  error: string | null;
  loading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<IAuthSuccessRes>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (
      state,
      action: PayloadAction<IAuthErrorRes["message"] | string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
