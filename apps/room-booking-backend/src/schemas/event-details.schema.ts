import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomSchedule } from './room-schedule.schema';

@Schema({ versionKey: false })
export class EventDetails extends AbstractDocument {
  @Prop({ required: true })
  organizer: string;

  @Prop({ required: true })
  roomSchedule: RoomSchedule[];

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;
}

export const EventDetailsSchema = SchemaFactory.createForClass(EventDetails);
