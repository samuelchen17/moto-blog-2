import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IShowMoreLoadingState {
  showMoreLoading: boolean;
}

const initialState: IShowMoreLoadingState = {
  showMoreLoading: false,
};

const showMoreLoadingSlice = createSlice({
  name: "showMoreLoading",
  initialState,
  reducers: {
    setShowMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.showMoreLoading = action.payload;
    },
  },
});

export const { setShowMoreLoading } = showMoreLoadingSlice.actions;

export default showMoreLoadingSlice.reducer;
