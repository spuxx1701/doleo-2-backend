import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from 'src/mappings/mapper';
import User from 'src/user/entities/user.entity';
import { validateOrThrow } from 'src/utils/service-helper';
import { FindOneOptions, Repository } from 'typeorm';
import ListEntryCreateDto from '../dtos/list-entry/list-entry.create.dto';
import ListEntryUpdateDto from '../dtos/list-entry/list-entry.update.dto';
import ListEntry from '../entities/list-entry.entity';
import ListsService from './lists.service';

@Injectable()
export default class ListEntriesService {
  constructor(
    @InjectRepository(ListEntry)
    private repository: Repository<ListEntry>,
    private listsService: ListsService,
  ) {}

  async findOne(options: FindOneOptions<ListEntry>, user: User) {
    const listEntry = await this.repository.findOne(options);
    if (listEntry) {
      await this.listsService.findOne(
        {
          where: { id: listEntry.list.id },
          relations: {
            owner: true,
            members: true,
          },
        },
        user,
      );
    }
    if (!listEntry) {
      throw new NotFoundException();
    }
    return listEntry;
  }

  async create(
    listEntryCreateDto: ListEntryCreateDto,
    user: User,
  ): Promise<ListEntry> {
    const newListEntry = mapper.map(
      listEntryCreateDto,
      ListEntryCreateDto,
      ListEntry,
    );
    const list = await this.listsService.findOne(
      {
        where: { id: listEntryCreateDto.list },
      },
      user,
    );
    this.listsService.validateListAccess(list, user);
    if (!list) throw new BadRequestException('Invalid list id.');
    await this.listsService.validateListAccess(list, user);
    newListEntry.list = list;
    await validateOrThrow(newListEntry);
    const result = await this.repository.save(newListEntry);
    Logger.log(
      `User '${user.displayName}' (${user.id}) created list entry '${result.text}' (${result.id}) for list '${result.list.displayName}' (${result.list.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async update(
    id: string,
    listEntryUpdateDto: ListEntryUpdateDto,
    user: User,
  ): Promise<ListEntry> {
    const partialListEntry = {
      id,
      ...mapper.map(listEntryUpdateDto, ListEntryUpdateDto, ListEntry),
    };
    // Find and merge list entry. Includes a workaround because TypeORM's preload does
    // not load eager relations: https://github.com/typeorm/typeorm/issues/8944
    const updatedListEntry = await this.repository.preload(partialListEntry);
    if (!updatedListEntry) throw new NotFoundException();
    updatedListEntry.list = (
      await this.repository.findOne({
        where: { id },
        relations: { list: true },
      })
    ).list;
    await this.listsService.validateListAccess(updatedListEntry.list, user);
    await validateOrThrow(updatedListEntry);
    const result = await this.repository.save(updatedListEntry);
    Logger.log(
      `User '${user.displayName}' (${user.id}) updated list entry '${result.text}' (${result.id}) for list '${result.list.displayName}' (${result.list.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async delete(id: string, user: User): Promise<void> {
    const listEntry = await this.repository.findOne({
      where: { id },
      relations: { list: true },
    });
    if (!listEntry) throw new NotFoundException();
    await this.listsService.validateListAccess(listEntry.list, user);
    await this.repository.delete(id);
    Logger.log(
      `User '${user.displayName}' (${user.id}) deleted list entry '${listEntry.text}' (${listEntry.id}) for list '${listEntry.list.displayName}' (${listEntry.list.id}).`,
      this.constructor.name,
    );
  }
}
