import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto.js';
import { UpdateSkillDto } from './dto/update-skill.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
    constructor(@InjectRepository(Skill) private repo: Repository<Skill>) {}

  
  create(createSkillDto: CreateSkillDto) {
    return 'This action adds a new skill';
  }

  findAll() {
 return this.repo.find({ order: { id: 'ASC' }});
  }
  
  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
