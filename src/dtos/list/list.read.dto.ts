import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import ListDto from './list.dto';
import UserDto from '../user/user.dto';
import ListEntryReadDto from '../list-entry/list-entry.read.dto';

export default class ListReadDto extends ListDto {
  @ApiProperty({
    description: 'The unique id of the list.',
  })
  @AutoMap()
  readonly id: string;

  @ApiProperty({
    description: 'Who owns the list.',
  })
  @AutoMap(() => UserDto)
  readonly owner: UserDto;

  @ApiProperty({
    description: 'Who has access to the list.',
  })
  @AutoMap(() => [UserDto])
  readonly members: UserDto[];

  @ApiProperty({
    description: 'The entries that belong to this list.',
  })
  @AutoMap(() => [ListEntryReadDto])
  readonly entries: ListEntryReadDto[];
}
