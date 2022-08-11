import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import UserDto from 'src/dtos/user/user.dto';
import User from 'src/entities/user.entity';
import { mapper } from 'src/mappings/mapper';
import UsersService from 'src/services/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all users. Does not include sensible information.',
  })
  async findMany(): Promise<UserDto[]> {
    const users = await this.service.findMany();
    return mapper.mapArray(users, User, UserDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a user by id. Does not include sensible information.',
  })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.service.findOne(id);
    return mapper.map(user, User, UserDto);
  }
}
