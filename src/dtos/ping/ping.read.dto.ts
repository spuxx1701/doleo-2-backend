import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import UserReadDto from 'src/user/dtos/user.read.dto';
import { pingProperties } from './ping.properties';

export default class PingReadDto {
  @ApiProperty({
    description: pingProperties.id.description,
  })
  @AutoMap()
  readonly id: string;

  @ApiProperty({
    description: pingProperties.sender.description,
  })
  @AutoMap(() => UserReadDto)
  readonly sender: UserReadDto;

  @ApiProperty({
    description: pingProperties.receiver.description,
  })
  @AutoMap(() => UserReadDto)
  readonly receiver: UserReadDto;

  @ApiProperty({
    description: pingProperties.seen.description,
  })
  @AutoMap()
  readonly seen: boolean;
}
