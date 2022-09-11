import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { profileProperties } from './profile.properties';

export default class ProfileUpdateDto {
  @ApiProperty(profileProperties.displayName)
  @AutoMap()
  displayName: string;

  @ApiProperty(profileProperties.selectedDesign)
  @AutoMap()
  selectedDesign: number;

  @ApiProperty(profileProperties.email)
  @AutoMap()
  readonly email: string;

  @ApiProperty(profileProperties.password)
  @AutoMap()
  readonly password: string;
}
