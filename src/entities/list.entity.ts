import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Length,
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
import { AutoMap } from '@automapper/classes';
import ListEntry from './list-entry.entity';
import User from './user.entity';

@Entity()
export default class List {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: '30' })
  @IsString()
  @Length(1, 30)
  @AutoMap()
  displayName: string;

  @Column({ type: 'varchar', length: '30' })
  @IsString()
  @Length(1, 30)
  @AutoMap()
  iconName: string;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  @AutoMap()
  hasAmounts: boolean;

  @OneToMany(() => ListEntry, (listEntry) => listEntry.list, {
    cascade: ['insert', 'remove'],
    orphanedRowAction: 'delete',
  })
  @IsOptional()
  @IsArray()
  @AutoMap(() => [ListEntry])
  entries: ListEntry[];

  @ManyToOne(() => User, (user) => user.ownedLists, {
    eager: true,
  })
  @IsNotEmpty()
  @AutoMap(() => User)
  owner: User;

  @ManyToMany(() => User, {
    eager: true,
    cascade: ['insert', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  @IsNotEmpty()
  @IsArray()
  @AutoMap(() => [User])
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
