import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Project } from './entities/project.entity';

import { CreateProjectDto } from './dto/create-project.dto';

import { generateUniqueId } from 'src/common/utils/uniqueId.util';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const { name, slug } = dto;

    const existingProject =
      await this.projectRepository.findOneBy({
        slug,
      });

    if (existingProject) {
      throw new ConflictException(
        'پروژه‌ای با این slug از قبل وجود دارد',
      );
    }

    const uniqueId = await generateUniqueId(
      this.projectRepository,
    );

    const project = this.projectRepository.create({
      id: uniqueId,
      name,
      slug,
    });

    await this.projectRepository.save(project);

    return {
      message: 'پروژه با موفقیت ایجاد شد',
      data: project,
    };
  }

  async findAll() {
    const projects =
      await this.projectRepository.find();

    return {
      data: projects,
    };
  }

  async findOne(id: number) {
    return this.projectRepository.findOneBy({
      id,
    });
  }
}