import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReservationRequest } from './dto/create-reservation.request';
import { DeleteReservationRequest } from './dto/delete-reservation.request';
import { EventDetailsRepository } from './event-details.repository';
import { RoomScheduleRepository } from './room-schedule.repository';
import { EventDetails } from './schemas/event-details.schema';
import { RoomSchedule } from './schemas/room-schedule.schema';

@Injectable()
export class AppService {
  constructor(
    private roomScheduleRepository: RoomScheduleRepository,
    private eventDetailsRepository: EventDetailsRepository,
  ) {}

  async getEventDetails(): Promise<EventDetails> {
    const eventDetails = await this.eventDetailsRepository.getEventDetails();
    const reservations =
      await this.roomScheduleRepository.getAllRoomSchedules();

    return {
      ...eventDetails[0],
      roomSchedule: reservations,
    };
  }

  createReservation(payload: CreateReservationRequest): Promise<RoomSchedule> {
    return this.roomScheduleRepository.createReservation(payload);
  }

  deleteReservation(payload: DeleteReservationRequest): Promise<RoomSchedule> {
    return this.roomScheduleRepository.deleteReservation(payload);
  }
}
