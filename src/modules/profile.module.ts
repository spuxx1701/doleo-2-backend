import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from 'src/controllers/profile.controller';
import User from 'src/entities/user.entity';
import ProfileService from 'src/services/profile.service';
import UsersModule from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  exports: [],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export default class ProfileModule {}
