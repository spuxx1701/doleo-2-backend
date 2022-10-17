import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { accountProperties } from './account.properties';
import FamilyDto from 'src/dtos/family/family.dto';

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

  @ApiProperty(accountProperties.password)
  @AutoMap()
  readonly password: string;

  @ApiProperty(accountProperties.family)
  @AutoMap(() => FamilyDto)
  readonly family: FamilyDto;
}
