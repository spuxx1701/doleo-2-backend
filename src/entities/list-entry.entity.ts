import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class ListEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '30' })
  text: string;

  @Column()
  amount: number;

  @Column()
  isChecked: true;

  @ManyToOne(() => List, (list) => list.entries)
  list: List;
}
