import { Exclude } from 'class-transformer';
import ListDto from './list.dto';

export default class ListCreateDto extends ListDto {
  @Exclude()
  hasAmounts: boolean;
}
