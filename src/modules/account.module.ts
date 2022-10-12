import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controllers/account.controller';
import TempPassword from 'src/entities/temp-password';
import { MailModule } from 'src/mail/mail.module';
import AccountService from 'src/services/account.service';
import User from 'src/user/entities/user.entity';
import UsersModule from 'src/user/users.module';

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
