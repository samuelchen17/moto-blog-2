export interface IGoogleAuthPayload {
  email: string;
  name: string;
  dpUrl: string;
}

export interface ISignUpAuthPayload {
  email: string;
  password: string;
  username: string;
}

export interface ISignInAuthPayload {
  emailOrUsername: string;
  password: string;
}

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
