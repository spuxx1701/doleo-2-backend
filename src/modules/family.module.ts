import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FamiliesController from 'src/controllers/families.controller';
import Family from 'src/entities/family.entity';
import FamiliesService from 'src/services/families.service';
import UsersModule from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Family]), UsersModule],
  exports: [],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export default class FamiliesModule {}
