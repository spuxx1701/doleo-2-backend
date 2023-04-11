import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class ClientErrorCreateDto {
  @ApiProperty({ description: 'The error message.', example: 'Some error.' })
  @AutoMap()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The error stack.',
    example: 'The stack information.',
  })
  @AutoMap()
  @IsString()
  stack: string;
}
