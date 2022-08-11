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

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @AutoMap()
  email: string;

  @Column({ type: 'varchar', length: 30 })
  @AutoMap()
  displayName: string;

  @Column()
  @AutoMap()
  password: string;

  @Column({ default: 0 })
  @AutoMap()
  selectedDesign: number;

  @ManyToOne(() => Family, (family) => family.members)
  @AutoMap(() => Family)
  family: Family;

  // @OneToMany(() => List, (list) => list.owner)
  // ownedLists: List[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
