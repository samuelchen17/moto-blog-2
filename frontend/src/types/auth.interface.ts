export interface IAuthSuccessRes {
  message: string;
  success: true;
  user: {
    id: string;
    username: string;
    profilePicture: string;
    email: string;
  };
}
export interface IAuthErrorRes {
  status: "error";
  success: false;
  statusCode: number;
  message: string;
}
