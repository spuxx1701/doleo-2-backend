import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from 'src/lists/entities/list.entity';
import ListsController from 'src/controllers/lists.controller';
import UsersModule from 'src/modules/users.module';
import ListEntry from '../entities/list-entry.entity';
import ListEntriesController from 'src/controllers/list-entries.controller';
import ListsService from '../services/lists.service';
import ListEntriesService from '../services/list-entries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListEntry]),
    UsersModule,
  ],
  exports: [TypeOrmModule, ListsService],
  controllers: [ListsController, ListEntriesController],
  providers: [ListsService, ListEntriesService],
})
export default class ListsModule {}
