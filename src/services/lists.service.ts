import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import List from 'src/entities/list.entity';
import UsersService from './users.service';
import { validateOrThrow } from 'src/utils/service-helper';
import ListUpdateDto from 'src/dtos/list/list.update.dto';
import ListCreateDto from 'src/dtos/list/list.create.dto';
import { mapper } from 'src/mappings/mapper';
import User from 'src/entities/user.entity';

@Injectable()
export default class ListsService {
  constructor(
    @InjectRepository(List)
    private repository: Repository<List>,
    private usersService: UsersService,
  ) {}

  async findAll(user: User): Promise<List[]> {
    const lists = await this.repository
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.members', 'user')
      .leftJoinAndSelect('list.owner', 'owner')
      .where('user.id = :id', { id: user.id })
      .orWhere('user.id = :id', { id: user.id })
      .getMany();
    return lists;
  }

  async findOne(options: FindOneOptions<List>, user: User): Promise<List> {
    const list = await this.repository.findOne({
      ...options,
    });
    if (!list) {
      throw new NotFoundException();
    }
    await this.validateListAccess(list, user);
    return list;
  }

  async create(listCreateDto: ListCreateDto, user: User): Promise<List> {
    const newList = mapper.map(listCreateDto, ListCreateDto, List);
    newList.owner = user;
    newList.members = [newList.owner];
    await validateOrThrow(newList);
    const result = await this.repository.save(newList);
    Logger.log(
      `User '${user.displayName}' (${user.id}) created new list '${result.displayName}' (${result.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async update(
    id: string,
    listUpdateDto: ListUpdateDto,
    user: User,
  ): Promise<List> {
    const partialList = {
      id,
      ...mapper.map(listUpdateDto, ListUpdateDto, List),
    };
    // Find and merge list. Includes a workaround because TypeORM's preload does
    // not load eager relations: https://github.com/typeorm/typeorm/issues/8944
    const updatedList = await this.repository.preload(partialList);
    if (!updatedList) throw new NotFoundException();
    const oldList = await this.repository.findOneBy({ id });
    // Only the owner is allowed to change the list
    await this.validateListOwnership(oldList, user);
    if (!updatedList.owner) updatedList.owner = oldList.owner;
    if (!updatedList.members) updatedList.members = oldList.members;
    if (listUpdateDto.owner) {
      // Find new owner
      const newOwner = await this.usersService.findOne({
        where: { id: listUpdateDto.owner },
      });
      if (!newOwner) {
        throw new BadRequestException('Owner is invalid.');
      }
      updatedList.owner = newOwner;
    }
    if (listUpdateDto.members) {
      // Find members
      const newMembers = await this.usersService.findMany({
        where: { id: In(listUpdateDto.members) },
      });
      updatedList.members = newMembers;
    }
    this.addOwnerToMembers(updatedList);
    // Validate and submit
    validateOrThrow(updatedList);
    const result = await this.repository.save(updatedList);
    Logger.log(
      `User '${user.displayName}' (${user.id}) updated list '${result.displayName}' (${result.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async delete(id: string, user: User): Promise<void> {
    const list = await this.repository.findOneBy({ id });
    if (list) {
      await this.validateListOwnership(list, user);
      await this.repository.delete({ id });
      Logger.log(
        `User '${user.displayName}' (${user.id}) deleted list '${list.displayName}' (${list.id}).`,
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

  /**
   * Checks whether the given user is the owner of the given list and throws an exception
   * if not.
   * @param list The list to validate.
   * @param user The user.
   */
  async validateListOwnership(list: List, user: User) {
    if (!list.owner) {
      list = await this.repository.findOne({
        where: { id: list.id },
        relations: {
          owner: true,
        },
      });
    }
    if (user.id !== list.owner.id) {
      Logger.log(
        `User '${user.displayName}' (${user.id}) tried to access list '${list.displayName}', (${list.id}), but access was forbidden.`,
        this.constructor.name,
      );
      throw new ForbiddenException();
    }
    return true;
  }

  /**
   * Checks whether the given user has access to the given list and throws an exception
   * if not.
   * @param list The list to validate.
   * @param user The user.
   */
  async validateListAccess(list: List, user: User) {
    if (!list.owner || list.members) {
      list = await this.repository.findOne({
        where: { id: list.id },
        relations: {
          owner: true,
          members: true,
        },
      });
    }
    if (list.owner.id === user.id) {
      return true;
    }
    if (list.members.find((member) => member.id === user.id)) {
      return true;
    }
    Logger.log(
      `User '${user.displayName}' (${user.id}) tried to access list '${list.displayName}', (${list.id}), but access was forbidden.`,
      this.constructor.name,
    );
    throw new ForbiddenException();
  }
}
