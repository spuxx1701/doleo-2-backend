import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { validateOrThrow } from 'src/utils/service-helper';
import { Repository } from 'typeorm';
import ListInvite from '../entities/list-invite.entity';
import ListsService from './lists.service';

@Injectable()
export default class ListInvitesService {
  constructor(
    @InjectRepository(ListInvite)
    private repository: Repository<ListInvite>,
    @Inject(forwardRef(() => ListsService))
    private listsService: ListsService,
  ) {}

  async findIncoming(user: User): Promise<ListInvite[]> {
    const invites = await this.repository.find({
      where: { recipient: user },
    });
    return invites;
  }

  async create(
    listId: string,
    recipient: User,
    user: User,
  ): Promise<ListInvite> {
    // Validate the list
    const list = await this.listsService.findOne(
      {
        where: { id: listId },
        relations: { members: true },
      },
      user,
    );
    // Make sure that the inviting user owns the list
    await this.listsService.validateListOwnership(list, user);
    // Make sure that the recipient doesn't yet have access to that list
    if (list.members.find((member) => member.id === recipient.id)) {
      throw new BadRequestException(
        'The recipient already has access to that list.',
      );
    }
    const invite = { list, recipient, sender: user } as ListInvite;
    validateOrThrow(invite);
    // Upsert with list and recipient as conflict fields
    await this.repository.upsert(invite, ['list', 'sender', 'recipient']);
    Logger.log(
      `User '${user.displayName}' (${user.id}) has invited user
      '${recipient.displayName}' (${recipient.id}) to list
      '${list.displayName}' (${list.id}).`,
      this.constructor.name,
    );
    return invite;
  }

  async delete(id: string, user: User): Promise<void> {
    const listInvite = await this.repository.findOne({
      where: { id },
      relations: { recipient: true, sender: true },
    });
    if (!listInvite) throw new NotFoundException();
    // Only sender and recipients may delete an invitation
    if (user.id !== listInvite.sender.id && user.id !== listInvite.recipient.id)
      throw new ForbiddenException();
    await this.repository.delete({ id });
    Logger.log(
      `User '${user.displayName}' (${user.id}) has deleted list invitation ${listInvite.id}.`,
      this.constructor.name,
    );
  }

  async markAsNotificationSent(id: string, user: User): Promise<ListInvite> {
    const invite = await this.repository.findOne({
      where: { id },
      relations: { recipient: true },
    });
    if (!invite) throw new NotFoundException();
    // Check whether signed in user is the recipient
    if (invite.recipient.id !== user.id) {
      throw new ForbiddenException();
    }
    const result = await this.repository.save(invite);
    Logger.log(
      `User '${user.displayName}' (${user.id}) has marked list invite '${invite.id}' as read.`,
      this.constructor.name,
    );
    return result;
  }

  async accept(id: string, user: User): Promise<void> {
    const invite = await this.repository.findOne({
      where: { id },
      relations: { list: true, recipient: true },
    });
    if (!invite) throw new NotFoundException();
    // Check whether signed in user is the recipient
    if (invite.recipient.id !== user.id) {
      throw new ForbiddenException();
    }
    await this.listsService.addUserToMembers(invite.list, user);
  }
}
