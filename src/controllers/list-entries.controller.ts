import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ListEntryCreateDto from 'src/dtos/list-entry/list-entry.create.dto';
import ListEntryReadDto from 'src/dtos/list-entry/list-entry.read.dto';
import ListEntryUpdateDto from 'src/dtos/list-entry/list-entry.update.dto';
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

  @Post()
  @ApiOperation({
    summary:
      'Creates a new list entry for the given list if the signed in user has access to that list.',
  })
  async create(
    @Body() listEntryCreateDto: ListEntryCreateDto,
  ): Promise<ListEntryReadDto> {
    const createdListEntry = await this.service.create(listEntryCreateDto);
    return mapper.map(createdListEntry, ListEntry, ListEntryReadDto);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'Updates a list entry if the signed in user has access to that list.',
  })
  async update(
    @Param('id') id: string,
    @Body() listEntryUpdateDto: ListEntryUpdateDto,
  ): Promise<ListEntryReadDto> {
    const updatedListEntry = await this.service.update(id, listEntryUpdateDto);
    return mapper.map(updatedListEntry, ListEntry, ListEntryReadDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Deletes a list entry if the signed in user has access to that list.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
