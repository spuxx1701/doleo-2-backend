import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserReadDto from 'src/user/dtos/user.read.dto';

export default class PingReadDto {
  @ApiProperty({ description: 'The id of the ping.' })
  @AutoMap()
  readonly id: string;

  @ApiProperty({ description: 'Who sent the ping.' })
  @AutoMap(() => UserReadDto)
  readonly sender: UserReadDto;
}
