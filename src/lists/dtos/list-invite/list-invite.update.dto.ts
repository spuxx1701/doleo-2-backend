import { listInviteProperties } from './list-invite.properties';
import { ApiProperty } from '@nestjs/swagger';
export default class ListInviteUpdateDto {
  @ApiProperty(listInviteProperties.accept)
  accept: boolean;
}
