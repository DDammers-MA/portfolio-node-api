import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SkillsModule } from './skills/skills.module.js';
import { FrameworksModule } from './frameworks/frameworks.module.js';
import { ExperiencesModule } from './experiences/experiences.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';

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
      // logging: true,

      }),
    }),
    AuthModule,
    SkillsModule, 
    FrameworksModule, 
    ExperiencesModule, 
    ProjectsModule, 
    AuthModule, 
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
