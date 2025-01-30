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

export interface IContactResponse {
  message: string;
  data: IContactForm;
}

export interface INotificationsCount {
  notificationsCount: number;
}
