import { createSlice } from "@reduxjs/toolkit";

interface IAuthModalState {
  authOpen: boolean;
  authMode: "login" | "register";
}

const initialState: IAuthModalState = {
  authOpen: false,
  authMode: "login",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    toggleAuthMode: (state) => {
      state.authMode = state.authMode === "login" ? "register" : "login";
    },
    toggleAuthModal: (state) => {
      state.authOpen = state.authOpen === false ? true : false;
    },
    openLogin: (state) => {
      state.authMode = "login";
      state.authOpen = true;
    },
    openRegister: (state) => {
      state.authMode = "login";
      state.authOpen = true;
    },
  },
});

export const { toggleAuthModal, toggleAuthMode, openLogin, openRegister } =
  authModalSlice.actions;

export default authModalSlice.reducer;
