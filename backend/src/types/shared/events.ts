export interface IEvent {
  _id: string;
  createdBy: string;
  date: Date;
  title: string;
  location: string;
  category: string;
  description: string;
  participants: string[];
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}
