import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IShowMoreLoadingState {
  showMoreLoading: boolean;
}

const initialState: IShowMoreLoadingState = {
  showMoreLoading: false,
};

const authModalSlice = createSlice({
  name: "showMoreLoading",
  initialState,
  reducers: {
    setShowMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.showMoreLoading = action.payload;
    },
  },
});

export const { setShowMoreLoading } = authModalSlice.actions;

export default authModalSlice.reducer;
