import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import UserPublicDto from '../user/user.public';
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
  @AutoMap(() => UserPublicDto)
  readonly sender: UserPublicDto;

  @ApiProperty({
    description: pingProperties.receiver.description,
  })
  @AutoMap(() => UserPublicDto)
  readonly receiver: UserPublicDto;

  @ApiProperty({
    description: pingProperties.seen.description,
  })
  @AutoMap()
  readonly seen: boolean;
}
