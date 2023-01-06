import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export default class ClientErrorCreateDto {
  @ApiProperty({ description: 'The error message.', example: 'Some error.' })
  @AutoMap()
  message: string;

  @ApiProperty({
    description: 'The error stack.',
    example: 'The stack information.',
  })
  @AutoMap()
  stack: string;
}
