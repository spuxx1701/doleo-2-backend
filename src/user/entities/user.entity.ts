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
import Family from '../../entities/family.entity';
import List from '../../lists/entities/list.entity';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @AutoMap()
  @IsString()
  @IsEmail()
  @Length(5, 50)
  email: string;

  @Column({ type: 'varchar', length: 30 })
  @AutoMap()
  @IsString()
  @Length(1, 30)
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
