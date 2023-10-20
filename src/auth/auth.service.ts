import axios from 'axios';
import { TokenDto } from './dto/token.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  login(login: LoginDto): Promise<Error | TokenDto> {
    return axios
      .post<TokenDto>(
        `${process.env.KC_AUTH_SERVER_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/token`,
        {
          username: login.userName,
          password: login.password,
          grant_type: 'password',
          client_id: process.env.KC_CLIENT_ID,
          client_secret: process.env.KC_SECRET,
          scope: 'openid',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .then((e) => e.data)
      .catch((e) => e);
  }

  refreshToken(token: string): Promise<Error | TokenDto> {
    return axios
      .post<TokenDto>(
        `${process.env.KC_AUTH_SERVER_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/token`,
        {
          refresh_token: token,
          grant_type: 'refresh_token',
          client_id: process.env.KC_CLIENT_ID,
          client_secret: process.env.KC_SECRET,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      )
      .then((e) => e.data)
      .catch((e) => e);
  }
}
