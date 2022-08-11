import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersModule from './modules/users.module';
import ListsModule from './modules/lists.module';
import ListEntriesModule from './modules/list-entries.module';
import FamiliesModule from './modules/family.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: process.env.DATABASE_SYNCHRONIZE.toLowerCase() === 'true',
    }),
    UsersModule,
    ListsModule,
    ListEntriesModule,
    FamiliesModule,
  ],
})
export class AppModule {}
