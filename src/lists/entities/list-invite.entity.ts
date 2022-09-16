import { AutoMap } from '@automapper/classes';
import User from 'src/entities/user.entity';
import List from 'src/lists/entities/list.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['list', 'sender', 'recipient'])
export default class ListInvite {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @ManyToOne(() => List)
  @AutoMap(() => List)
  list: List;

  @ManyToOne(() => User)
  @AutoMap(() => User)
  sender: User;

  @ManyToOne(() => User)
  @AutoMap(() => User)
  recipient: User;

  @Column({ default: false })
  @AutoMap()
  wasRead: boolean;
}
