import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserDto from '../user/user.dto';

export default class FamilyDto {
  @ApiProperty({
    description: 'The unique id of the family.',
  })
  @AutoMap()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the family.',
  })
  @AutoMap()
  readonly displayName: string;

  @ApiProperty({
    description: 'The family members.',
  })
  @AutoMap(() => [UserDto])
  readonly members: UserDto[];
}
