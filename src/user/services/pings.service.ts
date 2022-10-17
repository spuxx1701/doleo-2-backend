import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PushSubscriptionsService from 'src/push-subscriptions/services/push-notifications.service';
import { Repository } from 'typeorm';
import Ping from '../entities/ping.entity';
import User from '../entities/user.entity';

@Injectable()
export default class PingsService {
  constructor(
    @InjectRepository(Ping)
    private repository: Repository<Ping>,
    private pushSubscriptionsService: PushSubscriptionsService,
  ) {}

  async findIncoming(user: User): Promise<Ping[]> {
    return this.repository.find({ where: { recipient: user } });
  }

  async create(recipient: User, user: User): Promise<Ping> {
    const ping = { recipient, sender: user } as Ping;
    await this.repository.upsert(ping, ['sender', 'recipient']);
    Logger.log(
      `User '${user.displayName}' (${user.id}) pinged user '${recipient.displayName}' (${recipient.id}).`,
      this.constructor.name,
    );
    this.pushSubscriptionsService.send(
      recipient,
      `${user.displayName} hat an Dich gedacht!`,
      `${user.displayName} hat gerade in diesem Moment an Dich gedacht. ❤️`,
    );
    return ping;
  }

  async delete(id: string, user: User): Promise<void> {
    await this.repository.delete(id);
    Logger.log(
      `User '${user.displayName}' (${user.id}) deleted a ping.`,
      this.constructor.name,
    );
  }
}
