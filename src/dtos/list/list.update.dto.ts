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

  @ApiProperty(listProperties.hasAmounts)
  @ApiPropertyOptional()
  @AutoMap()
  hasAmounts: boolean;

  @ApiProperty(listProperties.ownerId)
  @ApiPropertyOptional()
  ownerId: string;

  @ApiProperty(listProperties.memberIds)
  @ApiPropertyOptional()
  memberIds?: string[];
}
