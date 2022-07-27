import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import User from 'src/entities/user.entity';
import UsersService from 'src/services/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async findMany(): Promise<User[]> {
    return await this.service.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.service.findOne(id);
  }
}
