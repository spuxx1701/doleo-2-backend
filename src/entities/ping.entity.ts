import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import User from './user.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export default class Ping {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @IsNotEmpty()
  @AutoMap(() => User)
  sender: User;

  @ManyToOne(() => User, {
    eager: true,
  })
  @IsNotEmpty()
  @AutoMap(() => User)
  receiver: User;

  @Column()
  @AutoMap()
  seen: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
