import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencesController } from './experiences.controller.js';
import { ExperiencesService } from './experiences.service.js';

describe('ExperiencesController', () => {
  let controller: ExperiencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperiencesController],
      providers: [ExperiencesService],
    }).compile();

    controller = module.get<ExperiencesController>(ExperiencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
