import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'apps/authentication/src/guards/jwt-authentication.guard';
import { AppService } from './app.service';
import { CreateReservationRequest } from './dto/create-reservation.request';
import { DeleteReservationRequest } from './dto/delete-reservation.request';
import { EventDetails } from './schemas/event-details.schema';
import { RoomSchedule } from './schemas/room-schedule.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getEventDetails')
  @UseGuards(JwtAuthenticationGuard)
  getEventDetails(): Promise<EventDetails> {
    return this.appService.getEventDetails();
  }

  @Post('createReservation')
  @UseGuards(JwtAuthenticationGuard)
  createReservation(
    @Body() reservation: CreateReservationRequest,
  ): Promise<RoomSchedule> {
    return this.appService.createReservation(reservation);
  }

  @Post('deleteReservation')
  @UseGuards(JwtAuthenticationGuard)
  deleteReservation(
    @Body() reservation: DeleteReservationRequest,
  ): Promise<RoomSchedule> {
    return this.appService.deleteReservation(reservation);
  }
}
