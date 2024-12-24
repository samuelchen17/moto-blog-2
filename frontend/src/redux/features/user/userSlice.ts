import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IErrorRes, ISuccessRes } from "src/types";

interface IUserState {
  currentUser: ISuccessRes | null;
  error: string | null;
  success: boolean | null;
  loading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  error: null,
  success: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    signInSuccess: (state, action: PayloadAction<ISuccessRes>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (
      state,
      action: PayloadAction<IErrorRes["message"] | string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateStop: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateSuccess: (state, action: PayloadAction<ISuccessRes>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (
      state,
      action: PayloadAction<IErrorRes["message"] | string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (
      state,
      action: PayloadAction<IErrorRes["message"] | string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  updateStop,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
