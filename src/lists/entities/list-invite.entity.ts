import { AutoMap } from '@automapper/classes';
import List from 'src/lists/entities/list.entity';
import User from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['list', 'sender', 'recipient'])
export default class ListInvite {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @ManyToOne(() => List, { eager: true })
  @AutoMap(() => List)
  list: List;

  @ManyToOne(() => User, { eager: true })
  @AutoMap(() => User)
  sender: User;

  @ManyToOne(() => User, { eager: true })
  @AutoMap(() => User)
  recipient: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
