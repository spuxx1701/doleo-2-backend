import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ListsService from 'src/services/lists.service';
import List from 'src/entities/list.entity';
import ListReadDto from 'src/dtos/list/list.read.dto';
import { mapper } from 'src/mappings/mapper';
import ListCreateOrUpdateDto from 'src/dtos/list/list.create-or-update.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';

@Controller('lists')
@ApiTags('Lists')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export default class ListsController {
  constructor(private service: ListsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all the lists the signed in user has access to.',
  })
  async findAll(): Promise<ListReadDto[]> {
    const lists = await this.service.findAll({
      relations: {
        owner: true,
        members: true,
        entries: true,
      },
    });
    return mapper.mapArray(lists, List, ListReadDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a list by id if the signed in user has access to it.',
  })
  async findOne(@Param('id') id: string): Promise<ListReadDto> {
    const list = await this.service.findOne({
      where: { id },
      relations: {
        owner: true,
        members: true,
        entries: true,
      },
    });
    return mapper.map(list, List, ListReadDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new list with the signed-in user as owner.',
  })
  async create(@Body() listDto: ListCreateOrUpdateDto) {
    return await this.service.create(listDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a list.',
  })
  async update(
    @Param('id') id: string,
    @Body() listDto: ListCreateOrUpdateDto,
  ) {
    return 'Updated!';
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Deletes a list if the requesting user is the list's owner.",
  })
  async remove(@Param('id') id: string) {
    return 'Deleted!';
  }
}
