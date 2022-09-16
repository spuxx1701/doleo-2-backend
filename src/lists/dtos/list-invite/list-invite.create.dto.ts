import { listInviteProperties } from './list-invite.properties';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export default class ListInviteCreateDto {
  @ApiProperty(listInviteProperties.listId)
  @AutoMap()
  list: string;

  @ApiProperty(listInviteProperties.sender)
  @AutoMap()
  sender: string;

  @ApiProperty(listInviteProperties.recipient)
  @AutoMap()
  recipient: string;
}
