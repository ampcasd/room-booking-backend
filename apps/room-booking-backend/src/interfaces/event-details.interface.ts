import { Brand } from '../enums/brand.enum';
import { RoomSchedule } from './room.interface';
import { TimeSlot, TimeSlotRaw } from './time-slot.interface';

export interface EventDetails {
  organizer: Brand;
  roomSchedule: RoomSchedule;
  date: Date;
  timePeriod: TimeSlot;
}

export interface EventDetailsRaw {
  organizer: Brand;
  roomSchedule: RoomSchedule;
  date: string;
  timePeriod: TimeSlotRaw;
}
