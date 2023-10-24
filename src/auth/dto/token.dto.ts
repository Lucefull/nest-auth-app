import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  expires_in: number;
  @ApiProperty()
  refresh_expires_in: number;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  token_type: string;
  @ApiProperty()
  idToken: string;
  @ApiProperty()
  notBeforePolicy: number;
  @ApiProperty()
  sessionState: string;
  @ApiProperty()
  scope: string;
}
