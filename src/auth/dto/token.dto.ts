export class TokenDto {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  idToken: string;
  notBeforePolicy: number;
  sessionState: string;
  scope: string;
}
