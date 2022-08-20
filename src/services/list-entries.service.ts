import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import ListEntry from 'src/entities/list-entry.entity';
import ListEntryCreateDto from 'src/dtos/list-entry/list-entry.create.dto';
import ListEntryUpdateDto from 'src/dtos/list-entry/list-entry.update.dto';
import { mapper } from 'src/mappings/mapper';
import ListsService from './lists.service';
import { validateOrThrow } from 'src/utils/service-helper';

@Injectable()
export default class ListEntriesService {
  constructor(
    @InjectRepository(ListEntry)
    private listEntriesRepository: Repository<ListEntry>,
    private listsService: ListsService,
  ) {}

  async findMany(options?: FindManyOptions<ListEntry>) {
    return await this.listEntriesRepository.find(options);
  }

  async findOne(options: FindOneOptions<ListEntry>) {
    return await this.listEntriesRepository.findOne(options);
  }

  async create(listEntryCreateDto: ListEntryCreateDto): Promise<ListEntry> {
    const newListEntry = mapper.map(
      listEntryCreateDto,
      ListEntryCreateDto,
      ListEntry,
    );
    const list = await this.listsService.findOne({
      where: { id: listEntryCreateDto.list },
    });
    if (!list) throw new BadRequestException('Invalid list id.');
    newListEntry.list = list;
    // ToDo: Check whether signed in user has access to that list
    validateOrThrow(newListEntry);
    const result = await this.listEntriesRepository.save(newListEntry);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (............) created list entry '${result.text}' (${result.id}) for list '${result.list.displayName}' (${result.list.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async update(
    id: string,
    listEntryUpdateDto: ListEntryUpdateDto,
  ): Promise<ListEntry> {
    const partialListEntry = {
      id,
      ...mapper.map(listEntryUpdateDto, ListEntryUpdateDto, ListEntry),
    };
    // Find and merge list entry. Includes a workaround because TypeORM's preload does
    // not load eager relations: https://github.com/typeorm/typeorm/issues/8944
    const updatedListEntry = await this.listEntriesRepository.preload(
      partialListEntry,
    );
    if (!updatedListEntry) throw new NotFoundException();
    updatedListEntry.list = (
      await this.listEntriesRepository.findOne({
        where: { id },
        relations: { list: true },
      })
    ).list;
    // ToDo: Check whether signed in user has access to that list
    validateOrThrow(updatedListEntry);
    const result = await this.listEntriesRepository.save(updatedListEntry);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (............) updated list entry '${result.text}' (${result.id}) for list '${result.list.displayName}' (${result.list.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async delete(id: string): Promise<void> {
    const listEntry = await this.listEntriesRepository.findOne({
      where: { id },
      relations: { list: true },
    });
    if (!listEntry) throw new NotFoundException();
    // ToDo: Check whether signed in user has access to that list
    await this.listEntriesRepository.delete(id);
    // ToDo: Log signed in user
    Logger.log(
      `User 'Leo' (............) deleted list entry '${listEntry.text}' (${listEntry.id}) for list '${listEntry.list.displayName}' (${listEntry.list.id}).`,
      this.constructor.name,
    );
  }
}
