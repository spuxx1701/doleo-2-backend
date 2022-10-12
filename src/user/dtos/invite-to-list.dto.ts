import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class InviteToListDto {
  @ApiProperty({
    description: 'The id of the list.',
  })
  @IsString()
  @IsNotEmpty()
  readonly list: string;
}
