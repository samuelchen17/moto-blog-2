export interface IUpdateUserPayload {
  username?: string;
  profilePicture?: string;
  email?: string;
  password?: string;
}

export interface IUserSuccessRes {
  message: string;
  success: true;
  user: {
    id: string;
    username: string;
    profilePicture: string;
    email: string;
  };
}
