import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export default class ClientErrorReadDto {
  @ApiProperty({ description: 'The internal id of the error.' })
  @AutoMap()
  id: string;

  @ApiProperty({
    description: 'The timestamp of the error.',
  })
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ description: 'The error message.' })
  @AutoMap()
  message: string;

  @ApiProperty({
    description: 'The error stack.',
  })
  @AutoMap()
  stack: string;
}
