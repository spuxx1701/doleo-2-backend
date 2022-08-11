import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import ListDto from './list.dto';

export default class ListCreateOrUpdateDto extends ListDto {
  @ApiProperty({
    description: 'Who owns the list.',
    example: 'some-user-uuid',
    minLength: 36,
    maxLength: 36,
  })
  ownerId: string;

  @ApiProperty({
    description:
      'Who has access to the list. Does not need to include the owner id.',
    example: ['some-user-uuid', 'some-other-user-id'],
    type: [String],
    minLength: 36,
    maxLength: 36,
  })
  @ApiPropertyOptional()
  memberIds?: string[];
}
