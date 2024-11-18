import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "@shared/types/comment";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICommentState {
  comment: string;
  comments: IComment[];
}

const initialState: ICommentState = {
  comment: "",
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
  },
});

export const { setComment, setComments } = commentSlice.actions;

export default commentSlice.reducer;
