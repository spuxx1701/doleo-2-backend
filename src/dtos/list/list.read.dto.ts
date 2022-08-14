import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserDto from '../user/user.dto';
import ListEntryReadDto from '../list-entry/list-entry.read.dto';
import { listProperties } from './list.properties';

export default class ListReadDto {
  @ApiProperty(listProperties.id)
  @AutoMap()
  readonly id: string;

  @ApiProperty(listProperties.displayName)
  @AutoMap()
  readonly displayName: string;

  @ApiProperty(listProperties.iconName)
  @AutoMap()
  readonly iconName: string;

  @ApiProperty(listProperties.hasAmounts)
  @AutoMap()
  readonly hasAmounts: boolean;

  @ApiProperty(listProperties.owner)
  @AutoMap(() => UserDto)
  readonly owner: UserDto;

  @ApiProperty(listProperties.members)
  @AutoMap(() => [UserDto])
  readonly members: UserDto[];

  @ApiProperty(listProperties.entries)
  @AutoMap(() => [ListEntryReadDto])
  readonly entries: ListEntryReadDto[];
}
