import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({
    description: 'Your email (not your displayname!).',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Your password',
  })
  @IsString()
  password: string;
}
