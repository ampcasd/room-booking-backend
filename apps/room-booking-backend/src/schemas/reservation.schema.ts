import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  timeSlot: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
