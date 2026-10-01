import { Injectable } from '@nestjs/common';
import { CreateFrameworkDto } from './dto/create-framework.dto.js';
import { UpdateFrameworkDto } from './dto/update-framework.dto.js';
import { Repository } from 'typeorm';
import { Framework } from './entities/framework.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FrameworksService {
  
  constructor(@InjectRepository(Framework) private repo: Repository<Framework>) {}
  

  create(createFrameworkDto: CreateFrameworkDto) {
    return 'This action adds a new framework';
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} framework`;
  }

  update(id: number, updateFrameworkDto: UpdateFrameworkDto) {
    return `This action updates a #${id} framework`;
  }

  remove(id: number) {
    return `This action removes a #${id} framework`;
  }
}
