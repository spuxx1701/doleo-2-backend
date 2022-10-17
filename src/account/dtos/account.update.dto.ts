import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { accountProperties } from './account.properties';

export default class AccountUpdateDto {
  @ApiProperty(accountProperties.displayName)
  @AutoMap()
  displayName: string;

  @ApiProperty(accountProperties.selectedDesign)
  @AutoMap()
  selectedDesign: number;

  @ApiProperty(accountProperties.email)
  @AutoMap()
  readonly email: string;

  @ApiProperty(accountProperties.password)
  @AutoMap()
  readonly password: string;
}
