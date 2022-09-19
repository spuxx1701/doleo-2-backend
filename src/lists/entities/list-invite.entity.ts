import { AutoMap } from '@automapper/classes';
import User from 'src/entities/user.entity';
import List from 'src/lists/entities/list.entity';
import {
  Column,
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
  notificationSent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
