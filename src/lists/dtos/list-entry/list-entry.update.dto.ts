import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listEntryProperties } from './list-entry.properties';

export default class ListEntryUpdateDto {
  @ApiProperty(listEntryProperties.text)
  @ApiPropertyOptional()
  @AutoMap()
  text: string;

  @ApiProperty(listEntryProperties.amount)
  @ApiPropertyOptional()
  @AutoMap()
  amount: number;

  @ApiProperty(listEntryProperties.isChecked)
  @ApiPropertyOptional()
  @AutoMap()
  isChecked: boolean;
}
