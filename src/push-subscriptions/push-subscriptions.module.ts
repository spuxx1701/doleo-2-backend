import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PushSubscriptionsController from './controllers/push-subscriptions.controller';
import PushSubscription from './entities/push-subscription';
import PushSubscriptionsService from './services/push-notifications.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PushSubscription]),
  ],
  controllers: [PushSubscriptionsController],
  providers: [PushSubscriptionsService],
  exports: [],
})
export default class PushSubscriptionsModule {}
