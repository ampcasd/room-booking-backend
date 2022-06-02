import { UserId } from '../types/userId.type';

export interface Reservation {
  userId: UserId;
  timeSlot: Date;
}
