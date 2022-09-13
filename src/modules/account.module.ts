import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from 'src/auth/auth.module';
import { AccountController } from 'src/controllers/account.controller';
import TempPassword from 'src/entities/temp-password';
import User from 'src/entities/user.entity';
import AccountService from 'src/services/account.service';
import UsersModule from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TempPassword]),
    UsersModule,
    AuthModule,
  ],
  exports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export default class AccountModule {}
