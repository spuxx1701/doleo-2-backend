import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import List from 'src/entities/list.entity';
import ListDto from 'src/dtos/list/list.dto';
import UsersService from './users.service';
import { validateOrThrow } from 'src/utils/service-helper';

@Injectable()
export default class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }

  async findOne(id: string): Promise<List> {
    return this.listsRepository.findOneBy({ id });
  }

  async create(listDto: ListDto): Promise<List> {
    const list = new List();
    Object.assign(list, listDto);
    // // Find the owner
    // list.owner = await this.usersService.findOne(listDto.ownerId);
    // if (!list.owner) {
    //   throw new BadRequestException('Owner does not exist.');
    // }
    // // Push ownerId to memberIds if needed
    // const ownerIdInMemberIds = await listDto.memberIds.find(
    //   (element) => element === listDto.ownerId,
    // );
    // if (!ownerIdInMemberIds) {
    //   listDto.memberIds.push(listDto.ownerId);
    // }
    // // Find members
    // list.members = await this.usersService.findMany({
    //   where: {
    //     id: In(listDto.memberIds),
    //   },
    // } as FindManyOptions);
    await validateOrThrow(list);
    this.listsRepository.insert(list);
    return list;
  }

  async remove(id: string): Promise<void> {
    await this.listsRepository.delete(id);
  }
}
