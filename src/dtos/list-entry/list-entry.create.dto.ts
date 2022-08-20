import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { listEntryProperties } from './list-entry.properties';

export default class ListEntryCreateDto {
  @ApiProperty(listEntryProperties.text)
  @AutoMap()
  text: string;

  @ApiProperty(listEntryProperties.listId)
  list: string;
}
