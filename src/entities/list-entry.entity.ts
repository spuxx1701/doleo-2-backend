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
import {
  IsBoolean,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@Entity()
export default class ListEntry {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: '255' })
  @AutoMap()
  @IsString()
  @Length(1, 255)
  text: string;

  @Column({ default: 1 })
  @AutoMap()
  @IsNumber()
  @Min(1)
  @Max(99)
  amount: number;

  @Column({ default: false })
  @AutoMap()
  @IsBoolean()
  isChecked: true;

  @ManyToOne(() => List, (list) => list.entries, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @AutoMap(() => List)
  list: List;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
