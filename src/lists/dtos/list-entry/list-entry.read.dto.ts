import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import ListReadDto from '../list/list.read.dto';
import { listEntryProperties } from './list-entry.properties';

export default class ListEntryReadDto {
  @ApiProperty(listEntryProperties.id)
  @AutoMap()
  readonly id: string;

  @ApiProperty(listEntryProperties.text)
  @AutoMap()
  readonly text: string;

  @ApiProperty(listEntryProperties.amount)
  @AutoMap()
  readonly amount: number;

  @ApiProperty(listEntryProperties.isChecked)
  @AutoMap()
  readonly isChecked: boolean;

  @ApiProperty(listEntryProperties.list)
  @AutoMap(() => ListReadDto)
  list: ListReadDto;
}
