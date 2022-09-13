import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import AccountUpdateDto from 'src/dtos/account/account.update.dto';
import { mapper } from 'src/mappings/mapper';
import { validateOrThrow } from 'src/utils/service-helper';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { randomBytes } from 'crypto';
import TempPassword from 'src/entities/temp-password';

@Injectable()
export default class AccountService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(TempPassword)
    private tempPasswordRepository: Repository<TempPassword>,
    private authService: AuthService,
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
      partialAccount.password = await this.authService.hash(
        partialAccount.password,
      );
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
    const password = randomBytes(8).toString('hex');
    await this.tempPasswordRepository.insert({
      password,
      user,
    } as TempPassword);
    Logger.log(
      `User '${user.displayName}' (${user.id}) has requested a temporary password.`,
      this.constructor.name,
    );
  }
}