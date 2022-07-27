import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntry } from 'src/entities/list-entry.entity';

@Injectable()
export class ListEntriesService {
  constructor(
    @InjectRepository(ListEntry)
    private listEntriesRepository: Repository<ListEntry>,
  ) {}

  findAll(): Promise<ListEntry[]> {
    return this.listEntriesRepository.find();
  }

  findOne(id: string): Promise<ListEntry> {
    return this.listEntriesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.listEntriesRepository.delete(id);
  }
}
