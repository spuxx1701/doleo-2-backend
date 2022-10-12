import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from 'src/lists/entities/list.entity';
import UsersModule from 'src/user/users.module';
import ListEntry from './entities/list-entry.entity';
import ListInvite from './entities/list-invite.entity';
import ListEntriesController from './controllers/list-entries.controller';
import ListsController from './controllers/lists.controller';
import ListEntriesService from './services/list-entries.service';
import ListsService from './services/lists.service';
import ListInvitesController from './controllers/list-invites.controller';
import ListInvitesService from './services/list-invites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListEntry]),
    TypeOrmModule.forFeature([ListInvite]),
    forwardRef(() => UsersModule),
  ],
  exports: [ListsService, ListInvitesService],
  controllers: [ListsController, ListEntriesController, ListInvitesController],
  providers: [ListsService, ListEntriesService, ListInvitesService],
})
export default class ListsModule {}
