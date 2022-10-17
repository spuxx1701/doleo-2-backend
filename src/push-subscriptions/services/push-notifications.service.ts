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

  async send(recipient: User, title: string, body: string): Promise<void> {
    const subscriptions = await this.repository.find({
      where: { user: recipient },
    });
    if (subscriptions.length) {
      for (const subscription of subscriptions) {
        const notification = { title, body };
        try {
          await webpush.sendNotification(
            subscription,
            JSON.stringify(notification),
          );
          debugger;
        } catch (error) {
          Logger.log(
            `Found an inactive push subscription (${subscription.id}).`,
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
