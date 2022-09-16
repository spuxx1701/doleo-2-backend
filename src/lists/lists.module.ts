import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from 'src/lists/entities/list.entity';
import UsersModule from 'src/modules/users.module';
import ListEntry from './entities/list-entry.entity';
import ListInvite from './entities/list-invite.entity';
import ListEntriesController from './controllers/list-entries.controller';
import ListsController from './controllers/lists.controller';
import ListEntriesService from './services/list-entries.service';
import ListsService from './services/lists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListEntry]),
    TypeOrmModule.forFeature([ListInvite]),
    UsersModule,
  ],
  exports: [ListsService],
  controllers: [ListsController, ListEntriesController],
  providers: [ListsService, ListEntriesService],
})
export default class ListsModule {}
