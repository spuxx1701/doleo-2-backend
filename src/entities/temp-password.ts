import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import User from '../user/entities/user.entity';

@Entity()
@Unique(['user'])
export default class TempPassword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  @IsString()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
