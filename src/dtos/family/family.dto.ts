import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import UserReadDto from 'src/user/dtos/user.read';

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
  @AutoMap(() => [UserReadDto])
  readonly members: UserReadDto[];
}
