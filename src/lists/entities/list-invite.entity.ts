import { AutoMap } from '@automapper/classes';
import User from 'src/entities/user.entity';
import List from 'src/lists/entities/list.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ListInvite {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @OneToOne(() => List)
  @AutoMap(() => List)
  list: List;

  @OneToOne(() => User)
  @AutoMap(() => User)
  sender: User;

  @OneToOne(() => User)
  @AutoMap(() => User)
  recipient: User;

  @Column()
  @AutoMap()
  wasRead: boolean;
}
