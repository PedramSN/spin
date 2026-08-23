import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import { UserModule } from '../user/user.module';

import { AuthGuard } from '../../common/guards/auth.guard';
import { IsAdminGuard } from '../../common/guards/is-admin.guard';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    UserModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret: configService.get<string>(
          'jwt.accessTokenSecret',
        ),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    AuthGuard,
    IsAdminGuard,
  ],

  exports: [
    JwtModule,
    AuthGuard,
    IsAdminGuard,
  ],
})
export class AuthModule {}