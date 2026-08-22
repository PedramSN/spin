import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Code } from './entities/code.entity';

import { Project } from '../project/entities/project.entity';

import { CreateCodeDto } from './dto/create-code.dto';

import { UpdateCodeDto } from './dto/update-code.dto';

import { generateUniqueId } from 'src/common/utils/uniqueId.util';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateCodeDto) {
    const { projectId, code } = dto;

    const project = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!project) {
      throw new NotFoundException('پروژه پیدا نشد');
    }

    const existingCode = await this.codeRepository.findOneBy({
      code,
    });

    if (existingCode) {
      throw new ConflictException('این کد قبلاً ثبت شده است');
    }

    const uniqueId = await generateUniqueId(this.codeRepository);

    const newCode = this.codeRepository.create({
      id: uniqueId,
      code,
      projectId,
    });

    await this.codeRepository.save(newCode);

    return {
      message: 'کد با موفقیت ایجاد شد',
      data: newCode,
    };
  }

  async findAll() {
    const codes = await this.codeRepository.find();

    return {
      data: codes,
    };
  }

  async findOne(id: number) {
    const code = await this.codeRepository.findOneBy({
      id,
    });

    if (!code) {
      throw new NotFoundException('کد پیدا نشد');
    }

    return {
      data: code,
    };
  }

  async update(id: number, dto: UpdateCodeDto) {
    const code = await this.codeRepository.findOneBy({
      id,
    });

    if (!code) {
      throw new NotFoundException('کد پیدا نشد');
    }

    if (dto.projectId) {
      const project = await this.projectRepository.findOneBy({
        id: dto.projectId,
      });

      if (!project) {
        throw new NotFoundException('پروژه پیدا نشد');
      }
    }

    if (dto.code) {
      const existingCode = await this.codeRepository.findOneBy({
        code: dto.code,
      });

      if (existingCode && existingCode.id !== id) {
        throw new ConflictException('این کد قبلاً ثبت شده است');
      }
    }

    Object.assign(code, dto);

    await this.codeRepository.save(code);

    return {
      message: 'کد با موفقیت بروزرسانی شد',
      data: code,
    };
  }

  async remove(id: number) {
    const code = await this.codeRepository.findOneBy({
      id,
    });

    if (!code) {
      throw new NotFoundException('کد پیدا نشد');
    }

    await this.codeRepository.remove(code);

    return {
      message: 'کد با موفقیت حذف شد',
    };
  }
}
