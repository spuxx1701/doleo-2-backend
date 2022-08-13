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
    description: 'Retrieves all the lists the signed in user has access to.',
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
    description:
      'Retrieves a list by id if the signed in user has access to it.',
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
  async create(@Body() listDto: ListCreateOrUpdateDto) {
    return await this.service.create(listDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() listDto: ListCreateOrUpdateDto,
  ) {
    return 'Updated!';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return 'Deleted!';
  }
}
