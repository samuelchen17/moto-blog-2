export interface IContactRes {
  name: string;
  email: string;
  message: string;
  read: boolean;
}

export interface IContactForm extends IContactRes {
  createdAt: Date;
  updatedAt: Date;
}
