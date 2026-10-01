import { Module } from '@nestjs/common';
import { FrameworksService } from './frameworks.service.js';
import { FrameworksController } from './frameworks.controller.js';
import { Framework } from './entities/framework.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Framework])],
  controllers: [FrameworksController],
  providers: [FrameworksService],
})
export class FrameworksModule {}
