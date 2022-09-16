import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findMany(options?: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
