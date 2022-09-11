import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import AuthModule from './auth/auth.module';
import UsersModule from './modules/users.module';
import ListsModule from './modules/lists.module';
import ListEntriesModule from './modules/list-entries.module';
import FamiliesModule from './modules/family.module';
import CoreModule from './modules/core.module';
import PingsModule from './modules/ping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      logging: process.env.DEBUG === 'true',
      synchronize: process.env.DATABASE_SYNCHRONIZE.toLowerCase() === 'true',
    }),
    CoreModule,
    UsersModule,
    ListsModule,
    ListEntriesModule,
    FamiliesModule,
    PingsModule,
    AuthModule,
  ],
})
export class AppModule {}
