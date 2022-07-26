import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import UsersModule from 'src/user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import authConfig from './auth.config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import AccountModule from 'src/account/account.module';

@Module({
  imports: [
    UsersModule,
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_JWT_SECRET'),
        ...authConfig,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export default class AuthModule {}
