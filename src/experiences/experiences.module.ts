import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';
import { ExperiencesController } from './experiences.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule {}
