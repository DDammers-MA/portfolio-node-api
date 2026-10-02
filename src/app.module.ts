import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SkillsModule } from './skills/skills.module.js';
import { FrameworksModule } from './frameworks/frameworks.module.js';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
     type: 'mysql',
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    username: config.get('DB_USER'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),

    ssl: { rejectUnauthorized: false },
    autoLoadEntities: true,
    synchronize: false,
      logging: true,

      }),
    }),

    SkillsModule, 
    FrameworksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
