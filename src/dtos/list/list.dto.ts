import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export default class ListDto {
  @ApiProperty({
    description: 'The name of the list.',
    example: 'My awesome list',
    minLength: 1,
    maxLength: 30,
  })
  @AutoMap()
  displayName: string;

  @ApiProperty({
    description:
      'The icon of the list. Valid icons can be found here: https://fontawesome.com/start',
    default: 'list',
    minLength: 1,
    maxLength: 30,
  })
  @AutoMap()
  iconName: string;

  @ApiProperty({ description: 'Whether the list has amounts.', default: false })
  @AutoMap()
  hasAmounts = false;
}
