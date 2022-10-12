import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from 'src/auth/auth.module';
import ListsModule from 'src/lists/lists.module';
import UsersController from './controllers/users.controller';
import User from './entities/user.entity';
import UsersService from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ListsModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export default class UsersModule {}
