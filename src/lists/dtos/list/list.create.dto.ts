import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { listProperties } from './list.properties';
import { IsString } from 'class-validator';

export default class ListCreateDto {
  @ApiProperty(listProperties.displayName)
  @AutoMap()
  @IsString()
  displayName: string;

  @ApiProperty(listProperties.iconName)
  @AutoMap()
  @IsString()
  iconName: string;
}
