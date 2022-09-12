import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import FamilyDto from '../family/family.dto';
import { accountProperties } from './account.properties';

export default class AccountReadDto {
  @ApiProperty(accountProperties.id)
  @AutoMap()
  readonly id: string;

  @ApiProperty(accountProperties.displayName)
  @AutoMap()
  readonly displayName: string;

  @ApiProperty(accountProperties.selectedDesign)
  @AutoMap()
  readonly selectedDesign: number;

  @ApiProperty(accountProperties.email)
  @AutoMap()
  readonly email: string;

  @ApiProperty(accountProperties.family)
  @AutoMap(() => FamilyDto)
  readonly family: FamilyDto;
}
