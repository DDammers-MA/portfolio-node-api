import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { User } from './user.entity.js';

@Module({
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([User]),

JwtModule.registerAsync({
  imports: [ConfigModule],
  global: true,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),

    signOptions: {
      expiresIn: '60m',
    },
  }),
}),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtAuthGuard,
  ],

  exports: [
    JwtAuthGuard,
  ],
})
export class AuthModule {}