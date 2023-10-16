import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, Public, RoleGuard, Roles } from 'nest-keycloak-connect';

@Controller()
//@UseGuards(AuthGuard, RoleGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  @Roles({ roles: ['user'] })
  getUser(): string {
    return 'user';
  }

  @Get('/admin')
  @Roles({ roles: ['admin'] })
  teste(): string {
    return process.env.KC_REALM;
  }
}
