export interface IContactRequest {
  name: string;
  email: string;
  message: string;
  read?: boolean;
}

export interface IContactResponse extends IContactRequest {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
