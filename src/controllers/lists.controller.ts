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
import { ApiTags } from '@nestjs/swagger';
import ListsService from 'src/services/lists.service';
import List from 'src/entities/list.entity';
import ListDto from 'src/dtos/list.dto';

@Controller('lists')
@ApiTags('Lists')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export default class ListsController {
  constructor(private service: ListsService) {}

  @Get()
  async findAll(): Promise<List[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() listDto: ListDto) {
    return await this.service.create(listDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() listDto: ListDto) {
    return 'Updated!';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return 'Deleted!';
  }
}
