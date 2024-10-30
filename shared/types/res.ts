export interface ISuccessRes {
  message: string;
  success: true;
  user: {
    id: string;
    username: string;
    profilePicture: string;
    email: string;
    dateJoined: Date;
  };
}

export interface IErrorRes {
  status: "error";
  success: false;
  statusCode: number;
  message: string;
}
