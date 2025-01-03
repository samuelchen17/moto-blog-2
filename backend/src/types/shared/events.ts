export interface IEventRequest {
  createdBy: string;
  date: Date;
  title: string;
  location: string;
  category: string;
  description: string;
  participants: string[];
  capacity: number;
}

export interface IEvent extends IEventRequest {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
