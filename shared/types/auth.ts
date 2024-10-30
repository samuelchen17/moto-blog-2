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

export interface IAuthSuccessRes {
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

// move to error.ts, change to IErrorRes implement
export interface IAuthErrorRes {
  status: "error";
  success: false;
  statusCode: number;
  message: string;
}
