import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { buildWebPushConfig } from 'src/config/web-push.config';
import * as webpush from 'web-push';
import { mapper } from 'src/mappings/mapper';
import User from 'src/user/entities/user.entity';
import { validateOrThrow } from 'src/utils/service-helper';
import { Repository } from 'typeorm';
import PushSubscriptionCreateDto from '../dtos/push-subscription.create.dto';
import PushSubscription from '../entities/push-subscription';

@Injectable()
export default class PushSubscriptionsService {
  constructor(
    @InjectRepository(PushSubscription)
    private repository: Repository<PushSubscription>,
  ) {
    // Set up web-push
    buildWebPushConfig();
  }

  async subscribe(
    dto: PushSubscriptionCreateDto,
    user: User,
  ): Promise<PushSubscription> {
    const newPushSubscription = {
      keys: dto.keys,
      user,
      ...mapper.map(dto, PushSubscriptionCreateDto, PushSubscription),
    } as PushSubscription;
    await validateOrThrow(newPushSubscription);
    await this.repository.upsert(newPushSubscription, ['endpoint']);
    return newPushSubscription;
  }

  async deleteByEndpoint(endpoint: string): Promise<void> {
    const subscription = await this.repository.findOne({ where: { endpoint } });
    if (subscription) {
      await this.repository.delete(subscription);
    }
  }

  async send(recipient: User, title: string, body: string): Promise<void> {
    const subscriptions = await this.repository.find({
      where: { user: recipient },
    });
    if (subscriptions.length) {
      for (const subscription of subscriptions) {
        const notification = {
          title,
          body,
          icon: `${process.env.APP_CLIENT_URL}/assets/favicon.ico`,
        };
        try {
          await webpush.sendNotification(
            subscription,
            JSON.stringify(notification),
          );
        } catch (error) {
          await this.repository.delete(subscription.id);
          Logger.log(
            `Found an removed an invalid push subscription for user '${recipient.displayName}' (${recipient.id}).`,
            this.constructor.name,
          );
        }
      }
      Logger.log(
        `Sent push notifications to user '${recipient.displayName}' (${recipient.id}).`,
        this.constructor.name,
      );
    }
  }
}
