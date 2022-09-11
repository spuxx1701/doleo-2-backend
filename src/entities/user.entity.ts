import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import Family from './family.entity';
import List from './list.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @AutoMap()
  @IsString()
  email: string;

  @Column({ type: 'varchar', length: 30 })
  @AutoMap()
  @IsString()
  displayName: string;

  @Column()
  @AutoMap()
  @IsString()
  password: string;

  @Column({ default: 0 })
  @AutoMap()
  @IsNumber()
  selectedDesign: number;

  @ManyToOne(() => Family, (family) => family.members)
  @AutoMap(() => Family)
  family: Family;

  @OneToMany(() => List, (list) => list.owner)
  @AutoMap(() => [List])
  ownedLists: List[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
