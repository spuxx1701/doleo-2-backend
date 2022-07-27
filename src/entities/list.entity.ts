import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import ListEntry from './list-entry.entity';
import User from './user.entity';

@Entity()
export default class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '30' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @Column({ type: 'varchar', length: '30' })
  @IsString()
  @IsNotEmpty()
  iconName: string;

  @Column({ default: false })
  @IsBoolean()
  hasAmounts: boolean;

  @OneToMany(() => ListEntry, (listEntry) => listEntry.list)
  @IsOptional()
  @IsArray()
  entries: ListEntry;

  @ManyToOne(() => User, (user) => user.ownedLists)
  @IsNotEmpty()
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  @IsArray()
  members: User[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
