import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  displayName: string;

  @Column()
  password: string;

  @Column()
  lastLogin: Date;

  @Column('simple-json')
  settings: {
    selectedDesign: string;
    listAutoRefresh: boolean;
  };

  @OneToMany(() => List, (list) => list.owner)
  ownedLists: List[];
}
