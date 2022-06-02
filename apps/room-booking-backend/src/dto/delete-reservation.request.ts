import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteReservationRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  roomName: string;
}
