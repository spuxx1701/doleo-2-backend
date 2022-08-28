import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ping from 'src/entities/ping.entity';
import UsersModule from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ping]), UsersModule],
  exports: [],
  controllers: [],
  providers: [],
})
export default class PingsModule {}
