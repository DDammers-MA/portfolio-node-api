import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(id, dto);
  }

 

    @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.experiencesService.remove(id);
  }
}
