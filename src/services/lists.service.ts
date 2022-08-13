import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  In,
  Repository,
} from 'typeorm';
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
    const result = await this.listsRepository.insert(newList);
    Logger.log(
      `User '${newList.owner.displayName}' (${newList.owner.id}) created a new list '${newList.displayName}' (${result.identifiers[0].id}).`,
    );
    return result.raw[0] as List;
  }

  async update(id: string, listUpdateDto: ListUpdateDto): Promise<List> {
    const updatedList = mapper.map(listUpdateDto, ListUpdateDto, List);
    // Find list
    const list = await this.listsRepository.findOneBy({ id });
    if (!list) throw new NotFoundException();
    // ToDo: Check whether signed in user is listOwner
    // Find owner
    const newOwner = await this.usersService.findOne({
      where: { id: listUpdateDto.ownerId },
    });
    if (!newOwner) {
      throw new BadRequestException('Owner is invalid.');
    }
    updatedList.owner = newOwner;
    // Find members
    const newMembers = await this.usersService.findMany({
      where: { id: In(listUpdateDto.memberIds) },
    });
    updatedList.members = newMembers;
    this.addOwnerToMembers(list);
    // Validate and submit
    validateOrThrow(updatedList);
    const result = await this.listsRepository.update({ id }, updatedList);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (............) updated list '${list.displayName}' (${list.id}).`,
    );
    return result.raw[0] as List;
  }

  async delete(id: string): Promise<void> {
    const list = await this.listsRepository.findOneBy({ id });
    if (list) {
      // ToDo: Check whether signed in user is listOwner
      this.listsRepository.delete({ id });
      await this.listsRepository.delete(id);
      // Delete list members
      // Delete list entries
      // ToDo: Replace with signed in user
      Logger.log(
        `User 'Leo' (............) deleted list '${list.displayName}' (${list.id}).`,
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
