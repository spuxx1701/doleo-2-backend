import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { listProperties } from './list.properties';

export default class ListCreateDto {
  @ApiProperty(listProperties.displayName)
  @AutoMap()
  displayName: string;

  @ApiProperty(listProperties.iconName)
  @AutoMap()
  iconName: string;
}
