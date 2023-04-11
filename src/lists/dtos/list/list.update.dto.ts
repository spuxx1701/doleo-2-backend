import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from './list.properties';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export default class ListUpdateDto {
  @ApiProperty(listProperties.displayName)
  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  displayName: string;

  @ApiProperty(listProperties.iconName)
  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  iconName: string;

  @ApiProperty(listProperties.usesCheck)
  @ApiPropertyOptional()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  usesCheck: boolean;

  @ApiProperty(listProperties.hasAmounts)
  @ApiPropertyOptional()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  hasAmounts: boolean;

  @ApiProperty(listProperties.usesConfirmDelete)
  @ApiPropertyOptional()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  usesConfirmDelete: boolean;
}
