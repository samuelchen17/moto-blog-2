import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "@shared/types/comment";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICommentState {
  comment: string;
  comments: IComment[];
  totalComments: number;
}

const initialState: ICommentState = {
  comment: "",
  comments: [],
  totalComments: 0,
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
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload);
    },
    setTotalComments: (state, action: PayloadAction<number>) => {
      state.totalComments = action.payload;
    },
  },
});

export const { setComment, setComments, addComment, setTotalComments } =
  commentSlice.actions;

export default commentSlice.reducer;
