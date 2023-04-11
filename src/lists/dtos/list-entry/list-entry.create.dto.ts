import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { listEntryProperties } from './list-entry.properties';
import { IsString } from 'class-validator';

export default class ListEntryCreateDto {
  @ApiProperty(listEntryProperties.text)
  @AutoMap()
  @IsString()
  text: string;

  @ApiProperty(listEntryProperties.listId)
  @IsString()
  list: string;
}
