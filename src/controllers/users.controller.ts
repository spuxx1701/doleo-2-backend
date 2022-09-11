import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import UserPublicDto from 'src/dtos/user/user.public';
import User from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptors/logging';
import { mapper } from 'src/mappings/mapper';
import UsersService from 'src/services/users.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all users. Only includes public information.',
  })
  async findMany(): Promise<UserPublicDto[]> {
    const users = await this.service.findMany({ relations: { family: true } });
    return mapper.mapArray(users, User, UserPublicDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a user by id. Only includes public information.',
  })
  async findOne(@Param('id') id: string): Promise<UserPublicDto> {
    const user = await this.service.findOne({
      where: { id },
      relations: { family: true },
    });
    return mapper.map(user, User, UserPublicDto);
  }
}
