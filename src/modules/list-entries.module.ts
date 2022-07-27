import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntry } from '../entities/list-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntry])],
  exports: [TypeOrmModule],
})
export class ListEntriesModule {}
