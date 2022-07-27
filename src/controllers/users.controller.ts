import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export default class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
