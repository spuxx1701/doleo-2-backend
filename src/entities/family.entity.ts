import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import User from './user.entity';

@Entity()
export default class Family {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: 30 })
  @AutoMap()
  displayName: string;

  @OneToMany(() => User, (user) => user.family)
  @AutoMap(() => [User])
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
