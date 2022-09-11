import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserPublicDto from '../user/user.public';

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
  @AutoMap(() => [UserPublicDto])
  readonly members: UserPublicDto[];
}
