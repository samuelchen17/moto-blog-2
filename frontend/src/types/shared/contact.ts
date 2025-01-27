export interface IContactRequest {
  name: string;
  email: string;
  message: string;
  read?: boolean;
}

export interface IContactForm extends IContactRequest {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactColumns extends IContactRequest {
  createdAt: Date;
}
