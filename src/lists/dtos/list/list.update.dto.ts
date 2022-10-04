import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from './list.properties';

export default class ListUpdateDto {
  @ApiProperty(listProperties.displayName)
  @ApiPropertyOptional()
  @AutoMap()
  displayName: string;

  @ApiProperty(listProperties.iconName)
  @ApiPropertyOptional()
  @AutoMap()
  iconName: string;

  @ApiProperty(listProperties.usesCheck)
  @ApiPropertyOptional()
  @AutoMap()
  usesCheck: boolean;

  @ApiProperty(listProperties.hasAmounts)
  @ApiPropertyOptional()
  @AutoMap()
  hasAmounts: boolean;

  @ApiProperty(listProperties.usesConfirmDelete)
  @ApiPropertyOptional()
  @AutoMap()
  usesConfirmDelete: boolean;
}
