import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class ClientError {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  message: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  stack: string;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;
}
