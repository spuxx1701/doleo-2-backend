import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from 'src/mappings/mapper';
import { validateOrThrow } from 'src/utils/service-helper';
import { LessThan, Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import TempPassword from 'src/entities/temp-password';
import { Cron } from '@nestjs/schedule';
import { hash } from 'src/utils/auth-helper';
import { MailService } from 'src/mail/mail.service';
import AccountUpdateDto from '../dtos/account.update.dto';
import User from 'src/user/entities/user.entity';
import PushSubscriptionsService from 'src/push-subscriptions/services/push-notifications.service';

@Injectable()
export default class AccountService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(TempPassword)
    private tempPasswordRepository: Repository<TempPassword>,
    private mailService: MailService,
    private pushSubscriptionsService: PushSubscriptionsService,
  ) {}

  async read(user: User): Promise<User> {
    const account = await this.repository.findOne({
      where: { id: user.id },
      relations: { family: true },
    });
    if (!account) {
      throw new NotFoundException();
    }
    return { ...account, password: '' } as User;
  }

  async update(accountUpdateDto: AccountUpdateDto, user: User): Promise<User> {
    const partialAccount = {
      id: user.id,
      ...mapper.map(accountUpdateDto, AccountUpdateDto, User),
    };
    if (partialAccount.password) {
      // If provided, hash the password
      partialAccount.password = await hash(partialAccount.password);
    } else {
      // If not provided (empty string), make sure to delete the property, so the ORM
      // will not try to set an empty password (validation will also fail)
      delete partialAccount.password;
    }
    const updatedAccount = await this.repository.preload(partialAccount);
    await validateOrThrow(updatedAccount);
    const result = await this.repository.save(updatedAccount);
    Logger.log(
      `User '${result.displayName}' (${result.id}) updated their account.`,
      this.constructor.name,
    );
    return { ...result, password: '' } as User;
  }

  /**
   * Attempts to create a temporary password for a given user. Sends an auto-generated
   * password to that email adress if successful. The client cannot tell whether
   * the request was successful or not to protect email adresses.
   * @param email The account email.
   */
  async createTempPassword(email: string): Promise<void> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      Logger.log(`Email '${email}' could not be found.`, this.constructor.name);
      return;
    }
    const plain = randomBytes(8).toString('hex');
    const hashed = await hash(plain);
    // Upsert with user as conflict field
    await this.tempPasswordRepository.upsert(
      {
        password: hashed,
        user,
      } as TempPassword,
      ['user'],
    );
    Logger.log(
      `User '${user.displayName}' (${user.id}) has requested a temporary password.`,
      this.constructor.name,
    );
    // Send the email
    await this.mailService.sendTemporaryPassword(user, plain);
  }

  /**
   * Looks up a temporary password for a given user.
   * @param user The user.
   */
  async getTempPassword(user: User) {
    return await this.tempPasswordRepository.findOne({ where: { user } });
  }

  /**
   * Deletes a temporary password.
   * @param id The id of the temporary password.
   */
  async deleteTempPassword(password: TempPassword): Promise<void> {
    await this.tempPasswordRepository.delete(password.id);
    Logger.log(
      `Temporary password '${password.id}' has been removed.`,
      this.constructor.name,
    );
  }

  /**
   * Cron job: Once a day, remove temporary passwords that are older than
   * 24 hours.
   */
  @Cron('0 0 0 * * *')
  async cleanUpTemporaryPasswords() {
    const jobName = 'TempPasswordCleanup';
    const context = `${this.constructor.name} (${jobName})`;
    Logger.log(`Starting job.`, context);
    const threshold = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const oldTempPasswords = await this.tempPasswordRepository.find({
      where: {
        createdAt: LessThan(threshold),
      },
    });
    Logger.log(
      `Found ${oldTempPasswords.length} outdated temporary passwords.`,
      context,
    );
    for (const password of oldTempPasswords) {
      await this.deleteTempPassword(password);
    }
    Logger.log(`Job finished.`, context);
  }

  /**
   * Deletes the push subscription for a given endpoint.
   * @param endpoint The endpoint.
   */
  async unsubscribePushClient(endpoint: string): Promise<void> {
    return this.pushSubscriptionsService.deleteByEndpoint(endpoint);
  }
}
