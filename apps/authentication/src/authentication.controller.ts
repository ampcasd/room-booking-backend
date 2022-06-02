import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-authentication.guard';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import { CreateUserRequest } from './dto/create-user.request';
import { ObjectId } from 'mongoose';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('createUser')
  createUser(@Body() request: CreateUserRequest): Promise<User> {
    return this.authenticationService.createUser(request);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() user: User,
    @Req() request: Request,
  ): Promise<{ access_token: string; id: ObjectId }> {
    return await this.authenticationService.login(user);
  }
}
