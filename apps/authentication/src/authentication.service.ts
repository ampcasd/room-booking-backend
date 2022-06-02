import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from 'apps/authentication/src/dto/login.request';
import { UserRepository } from 'apps/room-booking-backend/src/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async createUser(payload: CreateUserRequest) {
    await this.validateCreateUserRequest(payload);

    const user = await this.userRepository.create({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    });

    return user;
  }

  async getUser({ username }) {
    return this.userRepository.find({ username });
  }

  private async validateCreateUserRequest(payload: CreateUserRequest) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        username: payload.username,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  verify(token: string): { access_token: string } {
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return decodedToken;
  }

  async validate(username: string, password: string): Promise<User> | null {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return isPasswordCorrect ? user : null;
  }

  async login(
    payload: LoginRequest,
  ): Promise<{ access_token: string; id: any }> {
    const user = await this.userRepository.findOne({
      username: payload.username,
    });
    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Credentials invalid');
    }

    return {
      access_token: this.jwtService.sign(user),
      id: user._id,
    };
  }
}
