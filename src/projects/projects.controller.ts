import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe, Req, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { extname } from 'path';
import { put } from '@vercel/blob';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

@UseGuards(JwtAuthGuard)
@Post()
create(@Req() req: any, @Body() dto: CreateProjectDto) {
  return this.projectsService.create({ ...dto, created_by: req.user.sub });
}

@UseGuards(JwtAuthGuard)
@Post('image')
@UseInterceptors(
  FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) =>
      /^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)
        ? cb(null, true)
        : cb(new BadRequestException('Only images are allowed'), false),
  }),
)
async uploadImage(@UploadedFile() file: Express.Multer.File) {
  if (!file) throw new BadRequestException('No file uploaded');

  const name = `projects/${randomUUID()}${extname(file.originalname).toLowerCase()}`;
  const blob = await put(name, file.buffer, { access: 'public' });

  return { url: blob.url };
}


 @Get('featured')
  featured(
    @Query('skill_id') skillId?: string,) {
    return this.projectsService.featured(skillId);
  }

  @Get()
  findAll(
  @Query('skill_id') skillId?: string,
  @Query('frameworks') frameworks?: string | string[],
) {
  return this.projectsService.findAll(skillId, frameworks);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

 @UseGuards(JwtAuthGuard)
@Put(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
  return this.projectsService.update(id, dto);
}

 @UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.projectsService.remove(id);
}
}
