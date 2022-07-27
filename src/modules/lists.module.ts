import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from 'src/entities/list.entity';
import ListsController from 'src/controllers/lists.controller';
import ListsService from 'src/services/lists.service';
import UsersModule from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), UsersModule],
  exports: [TypeOrmModule, ListsService],
  controllers: [ListsController],
  providers: [ListsService],
})
export default class ListsModule {}
