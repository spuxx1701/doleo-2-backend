import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ListEntry from 'src/entities/list-entry.entity';
import ListEntriesService from 'src/services/list-entries.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('List entries')
@Controller('list-entries')
export default class ListEntriesController {
  constructor(private service: ListEntriesService) {}

  @Get()
  async findAll(): Promise<ListEntry[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ListEntry> {
    return this.service.findOne(id);
  }
}
