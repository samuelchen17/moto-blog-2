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
