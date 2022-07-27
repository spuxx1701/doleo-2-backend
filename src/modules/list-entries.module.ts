import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ListEntry from 'src/entities/list-entry.entity';
import ListEntriesController from 'src/controllers/list-entries.controller';
import ListEntriesService from 'src/services/list-entries.service';
import ListsModule from './lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntry]), ListsModule],
  exports: [TypeOrmModule, ListEntriesService],
  controllers: [ListEntriesController],
  providers: [ListEntriesService],
})
export default class ListEntriesModule {}
