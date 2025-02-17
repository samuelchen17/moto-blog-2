// implement IPostPayload
export interface IPublishPostPayload {
  title: string;
  content: string;
  image?: string;
  category?: string;
}

export interface IPost {
  _id: string;
  createdBy: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  saves: number;
  likes: number;
  comments: number;
}

// refactor to user after testing implement
export interface IUserRes {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface IPostWithAuthor extends Omit<IPost, "createdBy"> {
  createdBy: IUserRes;
}

export interface IPostResponse {
  posts: IPostWithAuthor[];
  totalPosts: number;
  lastMonthPosts: number;
}

export interface IPostDeleteResponse {
  message: string;
  data: IPost;
}
