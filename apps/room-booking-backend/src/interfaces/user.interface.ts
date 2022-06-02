import { ObjectId } from 'mongoose';

export interface User {
  _id: string;
  token: ObjectId;
}
