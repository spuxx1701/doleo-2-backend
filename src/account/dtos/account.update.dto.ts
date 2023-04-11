import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { accountProperties } from './account.properties';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export default class AccountUpdateDto {
  @ApiProperty(accountProperties.displayName)
  @AutoMap()
  @IsString()
  @IsOptional()
  displayName: string;

  @ApiProperty(accountProperties.selectedDesign)
  @AutoMap()
  @IsNumber()
  @IsOptional()
  selectedDesign: number;

  @ApiProperty(accountProperties.email)
  @AutoMap()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty(accountProperties.password)
  @AutoMap()
  @IsString()
  @IsOptional()
  readonly password: string;
}
