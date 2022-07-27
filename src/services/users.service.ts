import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findMany(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
}
