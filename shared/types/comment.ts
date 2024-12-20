// Implement Icomment payload

export interface IComment {
  _id: string;
  content: string;
  postId: string;
  commentBy: string;
  likes: string[];
  numberOfLikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentResponse {
  comments: IComment[];
  totalComments: number;
}

export interface IAllCommentResponse extends ICommentResponse {
  lastMonthComments: number;
}
