export interface IContactRes {
  name: string;
  email: string;
  message: string;
}

export interface IContactForm extends IContactRes {
  createdAt: Date;
  updatedAt: Date;
}
