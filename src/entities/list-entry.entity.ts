import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import List from './list.entity';

@Entity()
export default class ListEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '255' })
  text: string;

  @Column({ default: 1 })
  amount: number;

  @Column({ default: false })
  isChecked: true;

  @ManyToOne(() => List, (list) => list.entries)
  list: List;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
