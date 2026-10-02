import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencesService {

  constructor(@InjectRepository(Experience) private readonly repo: Repository<Experience>) {}

  create(createExperienceDto: CreateExperienceDto) {
    return 'This action adds a new experience';
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' }});
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
