import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import AccountUpdateDto from 'src/dtos/account/account.update.dto';
import { mapper } from 'src/mappings/mapper';
import { validateOrThrow } from 'src/utils/service-helper';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export default class AccountService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
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
    return account;
  }

  async update(accountUpdateDto: AccountUpdateDto, user: User): Promise<User> {
    const partialAccount = {
      id: user.id,
      ...mapper.map(accountUpdateDto, AccountUpdateDto, User),
    };
    // If provided, hash the password
    if (partialAccount.password) {
      partialAccount.password = await this.authService.hash(
        partialAccount.password,
      );
    }
    const updatedAccount = await this.repository.preload(partialAccount);
    await validateOrThrow(updatedAccount);
    const result = await this.repository.save(updatedAccount);
    Logger.log(
      `User '${result.displayName}' (${result.id}) updated their account.`,
      this.constructor.name,
    );
    return result;
  }
}
