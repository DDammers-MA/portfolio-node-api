import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { DataSource, EntityManager } from 'typeorm';
import { Project } from './entities/project.entity.js';

@Injectable()
export class ProjectsService {

    constructor(private readonly dataSource: DataSource) {}

  create(dto: CreateProjectDto & { created_by: number }) {
  const { frameworks, ...data } = dto;

  return this.dataSource.transaction(async (manager) => {
    const project = await manager.save(manager.create(Project, data));
    await this.setFrameworks(manager, project.id, frameworks);
    return { item: project };
  });
}

  findAll(skillId?: string, frameworks?: string | string[]) {
   const qb = this.dataSource
    .createQueryBuilder()
    .from('projects', 'p')
    .select([
      'p.id AS id',
      'p.title AS title',
      'p.subTitle AS subTitle',
      'p.description AS description',
      'p.main_image AS main_image',
      'p.sub_image_1 AS sub_image_1',
      'p.sub_image_2 AS sub_image_2',
      'p.sub_image_3 AS sub_image_3',
      'p.created_at AS created_at',
      'p.created_by AS created_by',
      'p.github_url AS github_url',
      'p.live_url AS live_url',
    ])
    .addSelect('GROUP_CONCAT(DISTINCT f.framework_name)', 'frameworks')
    .addSelect('GROUP_CONCAT(DISTINCT s.name)', 'skills')
    .leftJoin('project_frameworks', 'pf', 'pf.project_id = p.id')
    .leftJoin('frameworks', 'f', 'f.id = pf.framework_id')
    .leftJoin('skills', 's', 's.id = f.skill_id')
    .groupBy('p.id')
    .orderBy('p.id', 'DESC');

  if (skillId) {
    qb.andWhere('s.id = :skillId', { skillId });
  }

  const frameworkIds = (Array.isArray(frameworks) ? frameworks.join(',') : frameworks ?? '')
    .split(',')
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (frameworkIds.length) {
    qb.andWhere('f.id IN (:...frameworkIds)', { frameworkIds });
  }

  return qb.getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }


  featured(skillId?: string) {
    const qb = this.dataSource
      .createQueryBuilder()
      .from('projects', 'p')
      .select([
        'p.id AS id',
        'p.title AS title',
        'p.subTitle AS subTitle',
        'p.description AS description',
        'p.main_image AS main_image',
        'p.sub_image_1 AS sub_image_1',
        'p.sub_image_2 AS sub_image_2',
        'p.sub_image_3 AS sub_image_3',
        'p.created_at AS created_at',
        'p.created_by AS created_by',
      ])
      .addSelect('GROUP_CONCAT(DISTINCT f.framework_name)', 'frameworks')
      .addSelect('GROUP_CONCAT(DISTINCT s.name)', 'skills')
      .leftJoin('project_frameworks', 'pf', 'pf.project_id = p.id')
      .leftJoin('frameworks', 'f', 'f.id = pf.framework_id')
      .leftJoin('skills', 's', 's.id = f.skill_id')
      .groupBy('p.id')
      .orderBy('p.id', 'DESC')
      .limit(6);

    if (skillId) {
      qb.where('s.id = :skillId', { skillId });
    }

    return qb.getRawMany();
  }


update(id: number, dto: UpdateProjectDto) {
  const { frameworks, ...data } = dto;

  return this.dataSource.transaction(async (manager) => {
    const project = await manager.findOneBy(Project, { id });
    if (!project) throw new NotFoundException(`Project ${id} not found`);

    Object.assign(project, data);
    const saved = await manager.save(project);

    // only touch the links when frameworks was actually sent
    if (frameworks !== undefined) {
      await this.setFrameworks(manager, id, frameworks);
    }
    return { item: saved };
  });
}

 remove(id: number) {
  return this.dataSource.transaction(async (manager) => {
    await manager.query('DELETE FROM project_frameworks WHERE project_id = ?', [id]);
    const result = await manager.delete(Project, id);
    if (result.affected === 0) throw new NotFoundException(`Project ${id} not found`);
    return { result: 1 };
  });
}

private async setFrameworks(manager: EntityManager, projectId: number, ids?: number[]) {
  await manager.query('DELETE FROM project_frameworks WHERE project_id = ?', [projectId]);

  const unique = [...new Set(ids ?? [])];
  if (unique.length) {
    await manager
      .createQueryBuilder()
      .insert()
      .into('project_frameworks', ['project_id', 'framework_id'])
      .values(unique.map((framework_id) => ({ project_id: projectId, framework_id })))
      .execute();
  }
}
}
