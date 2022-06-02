import { RoomId } from "../types/roomId.type";
import { Reservation } from "./reservation.interface";

export interface RoomSchedule {
  [key: RoomId]: Reservation[];
}

export interface RoomScheduleRaw {
  [key: RoomId]: Reservation[];
}
