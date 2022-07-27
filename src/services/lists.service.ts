import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from 'src/entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }

  findOne(id: string): Promise<List> {
    return this.listsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.listsRepository.delete(id);
  }
}
