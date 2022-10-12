import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PingsIncomingController from 'src/controllers/pings/pings.incoming.controller';
import PingsOutgoingController from 'src/controllers/pings/pings.outgoing.controller';
import Ping from 'src/entities/ping.entity';
import PingsService from 'src/services/pings.service';
import UsersModule from 'src/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ping]), UsersModule],
  exports: [],
  controllers: [PingsIncomingController, PingsOutgoingController],
  providers: [PingsService],
})
export default class PingsModule {}
