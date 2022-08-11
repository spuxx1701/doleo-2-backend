import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import ListEntryDto from './list-entry.dto';

export default class ListEntryCreateDto extends ListEntryDto {
  @ApiProperty({
    description: 'The list this list entry belongs to.',
    example: 'some-list-uuid',
    minLength: 36,
    maxLength: 36,
  })
  listId: string;
}
