import { AbstractRepository } from '@app/common';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateReservationRequest } from './dto/create-reservation.request';
import { DeleteReservationRequest } from './dto/delete-reservation.request';
import { Reservation } from './schemas/reservation.schema';
import { RoomSchedule } from './schemas/room-schedule.schema';

@Injectable()
export class RoomScheduleRepository extends AbstractRepository<RoomSchedule> {
  protected readonly logger = new Logger(RoomSchedule.name);

  constructor(
    @InjectModel(RoomSchedule.name) roomScheduleModel: Model<RoomSchedule>,
    @InjectConnection() connection: Connection,
  ) {
    super(roomScheduleModel, connection);
  }

  async createReservation(payload: CreateReservationRequest) {
    const flattened = await this.model.aggregate([
      { $unwind: '$reservations' },
    ]);
    const userFound = flattened.find(
      (record) => record.reservations.userId === payload.reservation.userId,
    );
    const hourReserved = flattened.find(
      (record) =>
        record.reservations.hourReserved === payload.reservation.timeSlot,
    );
    if (userFound || hourReserved) {
      throw new HttpException('Not allowed', HttpStatus.METHOD_NOT_ALLOWED);
    }
    return this.upsert(
      { name: payload.roomName },
      { $push: { reservations: payload.reservation } },
    );
  }

  async deleteReservation(payload: DeleteReservationRequest) {
    let found = await this.findOne({ name: payload.roomName });

    return this.findOneAndUpdate(
      { name: payload.roomName },
      {
        reservations: found.reservations.filter((reservation: Reservation) => {
          return reservation.userId !== payload.userId;
        }),
      },
    );
  }

  async getAllRoomSchedules() {
    return this.model.find();
  }
}
