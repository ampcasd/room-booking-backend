import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';

@Injectable()
export class ReservationRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(Reservation.name);

  constructor(
    @InjectModel(Reservation.name) reservationModel: Model<Reservation>,
    @InjectConnection() connection: Connection,
  ) {
    super(reservationModel, connection);
  }
}
