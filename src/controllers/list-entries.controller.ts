import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ListEntryReadDto from 'src/dtos/list-entry/list-entry.read.dto';
import ListEntry from 'src/entities/list-entry.entity';
import { LoggingInterceptor } from 'src/interceptors/logging';
import { mapper } from 'src/mappings/mapper';
import ListEntriesService from 'src/services/list-entries.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('List entries')
@Controller('list-entries')
export default class ListEntriesController {
  constructor(private service: ListEntriesService) {}

  @Get(':id')
  @ApiOperation({
    summary:
      'Returns a specific list entry if the signed in user has access to the list.',
  })
  async findOne(@Param('id') id: string): Promise<ListEntryReadDto> {
    const listEntry = await this.service.findOne({
      where: { id },
      relations: { list: true },
    });
    return mapper.map(listEntry, ListEntry, ListEntryReadDto);
  }
}
