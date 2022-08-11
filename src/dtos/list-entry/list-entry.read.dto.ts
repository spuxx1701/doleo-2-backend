import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import ListEntryDto from './list-entry.dto';
import ListReadDto from '../list/list.read.dto';

export default class ListEntryReadDto extends ListEntryDto {
  @ApiProperty({
    description: 'The unique id of the list entry.',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    description: 'The list this list entry belongs to.',
  })
  @AutoMap(() => ListReadDto)
  list: ListReadDto;
}
