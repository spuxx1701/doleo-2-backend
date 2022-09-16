import { listInviteProperties } from './list-invite.properties';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListInviteUpdateDto {
  @ApiProperty(listInviteProperties.id)
  @AutoMap()
  id: string;

  @ApiPropertyOptional(listInviteProperties.wasRead)
  @AutoMap()
  wasRead: boolean;
}
