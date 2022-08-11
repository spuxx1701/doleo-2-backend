import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import FamilyDto from '../family/family.dto';

export default class UserDto {
  @ApiProperty({
    description: 'The unique id of the user.',
  })
  @AutoMap()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the user.',
  })
  @AutoMap()
  displayName: string;

  @ApiProperty({
    description: 'The family this user belongs to.',
  })
  @AutoMap(() => FamilyDto)
  readonly family: FamilyDto;
}
