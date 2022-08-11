import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import ListEntry from 'src/entities/list-entry.entity';

@Injectable()
export default class ListEntriesService {
  constructor(
    @InjectRepository(ListEntry)
    private listEntriesRepository: Repository<ListEntry>,
  ) {}

  async findMany(options?: FindManyOptions<ListEntry>) {
    return await this.listEntriesRepository.find(options);
  }

  async findOne(options: FindOneOptions<ListEntry>) {
    return await this.listEntriesRepository.findOne(options);
  }

  async remove(id: string): Promise<void> {
    await this.listEntriesRepository.delete(id);
  }
}
