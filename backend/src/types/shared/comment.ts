// Implement IComment payload

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
  comments: IComment[] | ICommentWithPost[];
  totalComments: number;
}

export interface IAllCommentResponse extends ICommentResponse {
  lastMonthComments: number;
}

export interface ICommentWithPost extends IComment {
  post: {
    _id: string;
    title: string;
    slug: string;
  } | null;
}
