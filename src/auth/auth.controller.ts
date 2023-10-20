import { User } from './../user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard, Public, RoleGuard, Roles } from 'nest-keycloak-connect';

@Controller('auth')
@UseGuards(AuthGuard, RoleGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/me')
  @HttpCode(200)
  me(@Request() req) {
    return req.user;
  }

  @Get('refreshToken')
  @Public()
  @HttpCode(200)
  refreshToken(@Body() body) {
    console.log(body.refreshToken);
    return this.authService.refreshToken(body.refreshToken);
  }
}
