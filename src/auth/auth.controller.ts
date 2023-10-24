import { User } from './../user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard, Public, RoleGuard, Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Autenticação')
@UseGuards(AuthGuard, RoleGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    this.authService
      .login(loginDto)
      .then((e) => res.status(HttpStatus.OK).json(e))
      .catch((e) => res.status(500).send(e));
  }

  @Get('/me')
  @HttpCode(200)
  @ApiBearerAuth('JWT-auth')
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
