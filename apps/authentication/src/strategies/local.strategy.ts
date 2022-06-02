import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string) {
    const user = await this.authenticationService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException('Credentials not valid');
    }

    return user;
  }
}
