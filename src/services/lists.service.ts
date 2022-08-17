import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import List from 'src/entities/list.entity';
import UsersService from './users.service';
import { validateOrThrow } from 'src/utils/service-helper';
import ListUpdateDto from 'src/dtos/list/list.update.dto';
import ListCreateDto from 'src/dtos/list/list.create.dto';
import { mapper } from 'src/mappings/mapper';

@Injectable()
export default class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private usersService: UsersService,
  ) {}

  async findAll(options?: FindManyOptions<List>): Promise<List[]> {
    return this.listsRepository.find(options);
  }

  async findOne(options: FindOneOptions<List>): Promise<List> {
    return this.listsRepository.findOne(options);
  }

  async create(listCreateDto: ListCreateDto): Promise<List> {
    const newList = mapper.map(listCreateDto, ListCreateDto, List);
    // Find the owner
    // ToDo: Make this the signed in user
    newList.owner = await this.usersService.findOne({
      where: { displayName: 'Leo' },
    });
    newList.members = [newList.owner];
    await validateOrThrow(newList);
    const result = await this.listsRepository.save(newList);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (........) created new list '${result.displayName}' (${result.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async update(id: string, listUpdateDto: ListUpdateDto): Promise<List> {
    const partialList = {
      id,
      ...mapper.map(listUpdateDto, ListUpdateDto, List),
    };
    // Find and merge list. Includes a workaround because TypeORM's preload does
    // not load eager relations: https://github.com/typeorm/typeorm/issues/8944
    const updatedList = await this.listsRepository.preload(partialList);
    if (!updatedList) throw new NotFoundException();
    const oldList = await this.listsRepository.findOneBy({ id });
    if (!updatedList.owner) updatedList.owner = oldList.owner;
    if (!updatedList.members) updatedList.members = oldList.members;
    // ToDo: Check whether signed in user is listOwner
    if (listUpdateDto.ownerId) {
      // Find owner
      const newOwner = await this.usersService.findOne({
        where: { id: listUpdateDto.ownerId },
      });
      if (!newOwner) {
        throw new BadRequestException('Owner is invalid.');
      }
      updatedList.owner = newOwner;
    }
    if (listUpdateDto.memberIds) {
      // Find members
      const newMembers = await this.usersService.findMany({
        where: { id: In(listUpdateDto.memberIds) },
      });
      updatedList.members = newMembers;
    }
    this.addOwnerToMembers(updatedList);
    // Validate and submit
    validateOrThrow(updatedList);
    const result = await this.listsRepository.save(updatedList);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (............) updated list '${result.displayName}' (${result.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async delete(id: string): Promise<void> {
    const list = await this.listsRepository.findOneBy({ id });
    if (list) {
      // ToDo: Check whether signed in user is listOwner
      await this.listsRepository.delete({ id });
      // ToDo: Replace with signed in user
      Logger.log(
        `User 'Leo' (............) deleted list '${list.displayName}' (${list.id}).`,
        this.constructor.name,
      );
    }
  }

  /**
   * Checks whether the members array constains the owner and add them if needed.
   */
  addOwnerToMembers(list: List) {
    if (!list.members.find((member) => member.id === list.owner.id)) {
      list.members.push(list.owner);
    }
  }
}
