import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Reservation } from '../schemas/reservation.schema';

export class CreateReservationRequest {
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @ValidateNested()
  @Type(() => Reservation)
  @IsNotEmpty()
  reservation: Reservation;
}
