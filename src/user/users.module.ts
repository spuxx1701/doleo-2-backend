import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from 'src/auth/auth.module';
import ListsModule from 'src/lists/lists.module';
import PushSubscriptionsModule from 'src/push-subscriptions/push-subscriptions.module';
import PingsController from './controllers/pings.controller';
import UsersController from './controllers/users.controller';
import Ping from './entities/ping.entity';
import User from './entities/user.entity';
import PingsService from './services/pings.service';
import UsersService from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Ping]),
    ListsModule,
    PushSubscriptionsModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController, PingsController],
  providers: [UsersService, PingsService],
})
export default class UsersModule {}
