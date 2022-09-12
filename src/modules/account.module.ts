import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controllers/account.controller';
import User from 'src/entities/user.entity';
import AccountService from 'src/services/account.service';
import UsersModule from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  exports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export default class AccountModule {}
