import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Family from 'src/entities/family.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export default class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private familiesRepository: Repository<Family>,
  ) {}

  async findMany(options: FindManyOptions<Family>): Promise<Family[]> {
    return this.familiesRepository.find(options);
  }

  async findOne(options: FindOneOptions<Family>): Promise<Family> {
    return this.familiesRepository.findOne(options);
  }
}
