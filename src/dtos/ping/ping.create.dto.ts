import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { pingProperties } from './ping.properties';

export default class PingCreateDto {
  @ApiProperty({
    description: pingProperties.receiverId.description,
    example: pingProperties.receiverId.example,
  })
  @AutoMap()
  receiver: string;
}
