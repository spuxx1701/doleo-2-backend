import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListEntryDto {
  @ApiProperty({
    description: 'The text of the list entry.',
    example: 'ToDo: Create some new lists!',
    minLength: 1,
    maxLength: 255,
  })
  @AutoMap()
  text: string;

  @ApiProperty({
    description: 'The amount of the list entry.',
    default: 1,
  })
  @ApiPropertyOptional()
  @AutoMap()
  amount: number;

  @ApiProperty({
    description: 'Whether the list entry is currently checked.',
    default: false,
  })
  @ApiPropertyOptional()
  @AutoMap()
  isChecked: boolean;
}
