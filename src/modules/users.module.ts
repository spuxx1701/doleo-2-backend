import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersController from 'src/controllers/users.controller';
import { UsersService } from 'src/services/users.service';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
