import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TempPassword from 'src/entities/temp-password';
import { MailModule } from 'src/mail/mail.module';
import User from 'src/user/entities/user.entity';
import UsersModule from 'src/user/users.module';
import { AccountController } from './controllers/account.controller';
import AccountService from './services/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TempPassword]),
    UsersModule,
    MailModule,
  ],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export default class AccountModule {}
