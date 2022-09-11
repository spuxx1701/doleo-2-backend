import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserReadDto from '../user/user.read';
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
  @AutoMap(() => UserReadDto)
  readonly owner: UserReadDto;

  @ApiProperty(listProperties.members)
  @AutoMap(() => [UserReadDto])
  readonly members: UserReadDto[];

  @ApiProperty(listProperties.entries)
  @AutoMap(() => [ListEntryReadDto])
  readonly entries: ListEntryReadDto[];
}
