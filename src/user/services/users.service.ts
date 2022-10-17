import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListInvitesService from 'src/lists/services/list-invites.service';
import PushSubscriptionsService from 'src/push-subscriptions/services/push-notifications.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import User from '../entities/user.entity';
import PingsService from './pings.service';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private listInvitesService: ListInvitesService,
    private pingsService: PingsService,
    private pushSubscriptionsService: PushSubscriptionsService,
  ) {}

  async findMany(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.repository.findOne(options);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async inviteToList(
    listId: string,
    recipientId: string,
    user: User,
  ): Promise<void> {
    // Validate the recipient
    const recipient = await this.findOne({
      where: { id: recipientId },
    });
    if (!recipient) {
      throw new BadRequestException('Invalid recipient.');
    }
    await this.listInvitesService.create(listId, recipient, user);
    // Send push notification
    await this.pushSubscriptionsService.send(
      recipient,
      `Listeneinladung`,
      `${user.displayName} hat Dich zu einer Liste eingeladen.`,
    );
  }

  async ping(recipientId: string, user: User): Promise<void> {
    // Validate the recipient
    const recipient = await this.findOne({
      where: { id: recipientId },
    });
    if (!recipient) {
      throw new BadRequestException('Invalid recipient.');
    }
    await this.pingsService.create(recipient, user);
  }
}
