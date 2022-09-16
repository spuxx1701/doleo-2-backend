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
import User from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptors/logging';
import ListCreateDto from 'src/lists/dtos/list/list.create.dto';
import ListReadDto from 'src/lists/dtos/list/list.read.dto';
import ListUpdateDto from 'src/lists/dtos/list/list.update.dto';
import List from 'src/lists/entities/list.entity';
import ListsService from 'src/lists/services/lists.service';
import { mapper } from 'src/mappings/mapper';

@Controller('lists')
@ApiTags('Lists')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class ListsController {
  constructor(private service: ListsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all the lists the signed in user has access to.',
  })
  async findAll(@Request() request): Promise<ListReadDto[]> {
    const lists = await this.service.findAll(request.user as User);
    return mapper.mapArray(lists, List, ListReadDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a list by id if the signed in user has access to it.',
  })
  async findOne(
    @Param('id') id: string,
    @Request() request,
  ): Promise<ListReadDto> {
    const list = await this.service.findOne(
      {
        where: { id },
        relations: {
          owner: true,
          members: true,
          entries: true,
        },
      },
      request.user as User,
    );
    return mapper.map(list, List, ListReadDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new list with the signed-in user as owner.',
  })
  async create(@Request() request, @Body() listCreateDto: ListCreateDto) {
    const createdList = await this.service.create(
      listCreateDto,
      request.user as User,
    );
    return mapper.map(createdList, List, ListReadDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a list.',
  })
  async update(
    @Param('id') id: string,
    @Request() request,
    @Body() listUpdateDto: ListUpdateDto,
  ) {
    const updatedList = await this.service.update(
      id,
      listUpdateDto,
      request.user as User,
    );
    return mapper.map(updatedList, List, ListReadDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Deletes a list if the requesting user is the list's owner.",
  })
  async remove(
    @Param('id') id: string,
    @Request() request,
  ): Promise<Record<string, never>> {
    await this.service.delete(id, request.user as User);
    return {};
  }
}
