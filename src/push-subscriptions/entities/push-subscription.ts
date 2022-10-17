import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsObject, IsOptional, IsString } from 'class-validator';
import User from 'src/user/entities/user.entity';

@Entity()
@Unique(['endpoint'])
export default class PushSubscription {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @ManyToOne(() => User, { eager: true })
  @AutoMap(() => User)
  @IsObject()
  user: User;

  @Column({ type: 'text' })
  @AutoMap()
  @IsString()
  endpoint: string;

  @Column({ nullable: true })
  @AutoMap()
  @IsOptional()
  expirationTime: number | null;

  @Column({ type: 'json' })
  @AutoMap()
  @IsObject()
  keys: {
    auth: string;
    p256dh: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
