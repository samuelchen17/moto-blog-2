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
}

export interface IPostWithAuthor extends IPost {
  author:
    | { username: string; profilePicture: string }
    | { username: "Deleted User" };
}

export interface IPostResponse {
  posts: IPost[];
  totalPosts: number;
  lastMonthPosts: number;
}
