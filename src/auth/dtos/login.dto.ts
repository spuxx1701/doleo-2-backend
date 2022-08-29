import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({
    description: 'Your email (not your displayname!).',
  })
  username: string;

  @ApiProperty({
    description: 'Your password',
  })
  password: string;
}
