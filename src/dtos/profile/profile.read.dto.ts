import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import FamilyDto from '../family/family.dto';
import { profileProperties } from './profile.properties';

export default class ProfileReadDto {
  @ApiProperty(profileProperties.id)
  @AutoMap()
  readonly id: string;

  @ApiProperty(profileProperties.displayName)
  @AutoMap()
  readonly displayName: string;

  @ApiProperty(profileProperties.selectedDesign)
  @AutoMap()
  readonly selectedDesign: number;

  @ApiProperty(profileProperties.email)
  @AutoMap()
  readonly email: string;

  @ApiProperty(profileProperties.family)
  @AutoMap(() => FamilyDto)
  readonly family: FamilyDto;
}
