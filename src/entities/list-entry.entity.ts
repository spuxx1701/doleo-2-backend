import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import List from './list.entity';

@Entity()
export default class ListEntry {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: '255' })
  @AutoMap()
  text: string;

  @Column({ default: 1 })
  @AutoMap()
  amount: number;

  @Column({ default: false })
  @AutoMap()
  isChecked: true;

  @ManyToOne(() => List, (list) => list.entries)
  @AutoMap(() => List)
  list: List;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
