import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ListEntry } from './list-entry.entity';
import { User } from './user.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '30' })
  iconName: string;

  @Column()
  hasAmounts: boolean;

  @OneToMany(() => ListEntry, (listEntry) => listEntry.list)
  entries: ListEntry;

  @ManyToOne(() => User, (user) => user.ownedLists)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];
}
