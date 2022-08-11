import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListEntryDto {
  @ApiProperty({
    description: 'The text of the list entry.',
    example: 'ToDo: Create some new lists!',
    minLength: 1,
    maxLength: 255,
  })
  text: string;

  @ApiProperty({
    description: 'The amount of the list entry.',
    default: 1,
  })
  @ApiPropertyOptional()
  amount: number;

  @ApiProperty({
    description: 'Whether the list entry is currently checked.',
    default: false,
  })
  @ApiPropertyOptional()
  isChecked: boolean;

  @ApiProperty({
    description: 'The list this list entry belongs to.',
    example: 'some-list-uuid',
    minLength: 36,
    maxLength: 36,
  })
  listId: string;
}
