import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ListDto {
  @ApiProperty({
    description: 'The name of the list.',
    example: 'My awesome list',
    minLength: 1,
    maxLength: 30,
  })
  displayName: string;

  @ApiProperty({
    description:
      'The icon of the list. Valid icons can be found here: https://fontawesome.com/start',
    default: 'list',
    minLength: 1,
    maxLength: 30,
  })
  iconName: string;

  @ApiProperty({ description: 'Whether the list has amounts.', default: false })
  hasAmounts: boolean;

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
