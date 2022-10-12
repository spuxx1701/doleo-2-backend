import ListReadDto from 'src/lists/dtos/list/list.read.dto';
import { listInviteProperties } from './list-invite.properties';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserReadDto from 'src/user/dtos/user.read.dto';

export default class ListInviteReadDto {
  @ApiProperty(listInviteProperties.id)
  @AutoMap()
  readonly id: string;

  @ApiProperty(listInviteProperties.list)
  @AutoMap(() => ListReadDto)
  readonly list: ListReadDto;

  @ApiProperty(listInviteProperties.sender)
  @AutoMap(() => UserReadDto)
  readonly sender: UserReadDto;

  @ApiProperty(listInviteProperties.recipient)
  @AutoMap(() => UserReadDto)
  readonly recipient: UserReadDto;

  @ApiProperty(listInviteProperties.notificationSent)
  @AutoMap()
  readonly notificationSent: boolean;
}
