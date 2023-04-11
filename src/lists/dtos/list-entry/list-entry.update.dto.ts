import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listEntryProperties } from './list-entry.properties';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ListEntryUpdateDto {
  @ApiProperty(listEntryProperties.text)
  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty(listEntryProperties.amount)
  @ApiPropertyOptional()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty(listEntryProperties.isChecked)
  @ApiPropertyOptional()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  isChecked: boolean;
}
