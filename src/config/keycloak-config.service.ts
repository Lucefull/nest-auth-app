import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    const KeycloakConnect: KeycloakConnectOptions = {
      authServerUrl: process.env.KC_AUTH_SERVER_URL,
      realm: process.env.KC_REALM,
      clientId: process.env.KC_CLIENT_ID,
      secret: process.env.KC_SECRET,
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
    console.log(
      '🚀 ~ file: keycloak-config.service.ts:27 ~ KeycloakConfigService ~ createKeycloakConnectOptions ~ KeycloakConnectOptions:',
      KeycloakConnect,
    );

    return KeycloakConnect;
  }
}
