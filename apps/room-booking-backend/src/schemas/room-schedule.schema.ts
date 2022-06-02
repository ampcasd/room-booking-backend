import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reservation } from './reservation.schema';

@Schema({ versionKey: false })
export class RoomSchedule extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  reservations: Reservation[];
}

export const RoomScheduleSchema = SchemaFactory.createForClass(RoomSchedule);
