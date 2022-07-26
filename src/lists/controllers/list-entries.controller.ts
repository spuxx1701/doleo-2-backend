import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging';
import ListEntryCreateDto from 'src/lists/dtos/list-entry/list-entry.create.dto';
import ListEntryReadDto from 'src/lists/dtos/list-entry/list-entry.read.dto';
import ListEntryUpdateDto from 'src/lists/dtos/list-entry/list-entry.update.dto';
import ListEntry from 'src/lists/entities/list-entry.entity';
import ListEntriesService from 'src/lists/services/list-entries.service';
import { mapper } from 'src/mappings/mapper';
import User from 'src/user/entities/user.entity';

@Controller('listEntries')
@ApiTags('List entries')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class ListEntriesController {
  constructor(private service: ListEntriesService) {}

  @Get(':id')
  @ApiOperation({
    summary:
      'Returns a specific list entry if the signed in user has access to the list.',
  })
  async findOne(
    @Param('id') id: string,
    @Request() request,
  ): Promise<ListEntryReadDto> {
    const listEntry = await this.service.findOne(
      {
        where: { id },
        relations: { list: true },
      },
      request.user as User,
    );
    return mapper.map(listEntry, ListEntry, ListEntryReadDto);
  }

  @Post()
  @ApiOperation({
    summary:
      'Creates a new list entry for the given list if the signed in user has access to that list.',
  })
  async create(
    @Request() request,
    @Body() listEntryCreateDto: ListEntryCreateDto,
  ): Promise<ListEntryReadDto> {
    const createdListEntry = await this.service.create(
      listEntryCreateDto,
      request.user as User,
    );
    return mapper.map(createdListEntry, ListEntry, ListEntryReadDto);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'Updates a list entry if the signed in user has access to that list.',
  })
  async update(
    @Param('id') id: string,
    @Request() request,
    @Body() listEntryUpdateDto: ListEntryUpdateDto,
  ): Promise<ListEntryReadDto> {
    const updatedListEntry = await this.service.update(
      id,
      listEntryUpdateDto,
      request.user as User,
    );
    return mapper.map(updatedListEntry, ListEntry, ListEntryReadDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Deletes a list entry if the signed in user has access to that list.',
  })
  async delete(
    @Param('id') id: string,
    @Request() request,
  ): Promise<Record<string, never>> {
    await this.service.delete(id, request.user as User);
    return {};
  }
}
