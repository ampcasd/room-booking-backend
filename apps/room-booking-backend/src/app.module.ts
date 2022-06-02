import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import {
  RoomSchedule,
  RoomScheduleSchema,
} from './schemas/room-schedule.schema';
import { RoomScheduleRepository } from './room-schedule.repository';
import { ReservationRepository } from './reservation.repository';
import {
  EventDetails,
  EventDetailsSchema,
} from './schemas/event-details.schema';
import { EventDetailsRepository } from './event-details.repository';
import { AuthenticationModule } from 'apps/authentication/src/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/room-booking-backend/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: RoomSchedule.name, schema: RoomScheduleSchema },
      { name: EventDetails.name, schema: EventDetailsSchema },
    ]),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RoomScheduleRepository,
    ReservationRepository,
    EventDetailsRepository,
  ],
})
export class AppModule {}
