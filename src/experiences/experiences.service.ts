import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencesService {

  constructor(
    @InjectRepository(Experience)
    private readonly repo: Repository<Experience>,
  ) {}

 async create(dto: CreateExperienceDto) {
  const experience = this.repo.create({
    ...dto,
    start_date: dto.start_date.slice(0, 10),
    end_date: dto.end_date?.slice(0, 10),
  });
    const saved = await this.repo.save(experience);
    return { item: saved };
  }

  findAll() {
    return this.repo.find({ order: { start_date: "DESC" }});
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

   async update(id: number, dto: UpdateExperienceDto) {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException(`Experience ${id} not found`);
    }
     Object.assign(experience, {
    ...dto,
    ...(dto.start_date && { start_date: dto.start_date.slice(0, 10) }),
    ...(dto.end_date && { end_date: dto.end_date.slice(0, 10) }),
  });
    const saved = await this.repo.save(experience);
    return { item: saved };
  }

async remove(id: number) {
  const result = await this.repo.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Experience ${id} not found`);
  }
  return { message: 'Experience deleted' };
}
}
