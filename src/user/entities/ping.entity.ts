import { AutoMap } from '@automapper/classes';
import User from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['sender', 'recipient'])
export default class Ping {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @ManyToOne(() => User, { eager: true })
  @AutoMap(() => User)
  sender: User;

  @ManyToOne(() => User, { eager: true })
  @AutoMap(() => User)
  recipient: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
