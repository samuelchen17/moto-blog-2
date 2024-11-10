import { createSlice } from "@reduxjs/toolkit";

interface IAuthModalState {
  tempImagePath: string | null;
}

const initialState: IAuthModalState = {
  tempImagePath: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setTempImagePath: (state, action) => {
      state.tempImagePath = action.payload;
    },
    deleteTempImageSuccess: (state) => {
      state.tempImagePath = null;
    },
  },
});

export const { setTempImagePath, deleteTempImageSuccess } = imageSlice.actions;

export default imageSlice.reducer;
