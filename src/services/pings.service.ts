import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PingCreateDto from 'src/dtos/ping/ping.create.dto';
import Ping from 'src/entities/ping.entity';
import { mapper } from 'src/mappings/mapper';
import { validateOrThrow } from 'src/utils/service-helper';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import UsersService from './users.service';

@Injectable()
export default class PingsService {
  constructor(
    @InjectRepository(Ping)
    private repository: Repository<Ping>,
    private usersService: UsersService,
  ) {}

  async findMany(options?: FindManyOptions<Ping>): Promise<Ping[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Ping>): Promise<Ping> {
    return this.repository.findOne(options);
  }

  async create(pingCreateDto: PingCreateDto): Promise<Ping> {
    const newPing = mapper.map(pingCreateDto, PingCreateDto, Ping) as Ping;
    // Find receiver
    newPing.receiver = await this.usersService.findOne({
      where: { id: pingCreateDto.receiver },
    });
    if (!newPing.receiver) {
      throw new BadRequestException('Receiver is invalid.');
    }
    // TODO: make this the signed in user
    newPing.sender = await this.usersService.findOne({
      where: { displayName: 'Leo' },
    });
    await validateOrThrow(newPing);
    const result = await this.repository.save(newPing);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (........) pinged user '${newPing.receiver}'.`,
      this.constructor.name,
    );
    return result;
  }

  // async markAsSeen(id: string): Promise<Ping> {
  //   // implement me
  // }
}
