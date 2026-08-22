import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Wheel } from './entities/wheel.entity';

import { Project } from '../project/entities/project.entity';

import { CreateWheelDto } from './dto/create-wheel.dto';

import { UpdateWheelDto } from './dto/update-wheel.dto';

import { generateUniqueId } from 'src/common/utils/uniqueId.util';

@Injectable()
export class WheelService {
  constructor(
    @InjectRepository(Wheel)
    private readonly wheelRepository: Repository<Wheel>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateWheelDto) {
    const { name, projectId } = dto;

    const project =
      await this.projectRepository.findOneBy({
        id: projectId,
      });

    if (!project) {
      throw new NotFoundException(
        'پروژه پیدا نشد',
      );
    }

    const uniqueId = await generateUniqueId(
      this.wheelRepository,
    );

    const wheel = this.wheelRepository.create({
      id: uniqueId,
      name,
      projectId,
    });

    await this.wheelRepository.save(wheel);

    return {
      message: 'گردونه با موفقیت ایجاد شد',
      data: wheel,
    };
  }

  async findAll() {
    const wheels =
      await this.wheelRepository.find();

    return {
      data: wheels,
    };
  }

  async findOne(id: number) {
    const wheel =
      await this.wheelRepository.findOneBy({
        id,
      });

    if (!wheel) {
      throw new NotFoundException(
        'گردونه پیدا نشد',
      );
    }

    return {
      data: wheel,
    };
  }

  async update(
    id: number,
    dto: UpdateWheelDto,
  ) {
    const wheel =
      await this.wheelRepository.findOneBy({
        id,
      });

    if (!wheel) {
      throw new NotFoundException(
        'گردونه پیدا نشد',
      );
    }

    if (dto.projectId) {
      const project =
        await this.projectRepository.findOneBy({
          id: dto.projectId,
        });

      if (!project) {
        throw new NotFoundException(
          'پروژه پیدا نشد',
        );
      }
    }

    Object.assign(wheel, dto);

    await this.wheelRepository.save(wheel);

    return {
      message: 'گردونه با موفقیت بروزرسانی شد',
      data: wheel,
    };
  }

  async remove(id: number) {
    const wheel =
      await this.wheelRepository.findOneBy({
        id,
      });

    if (!wheel) {
      throw new NotFoundException(
        'گردونه پیدا نشد',
      );
    }

    await this.wheelRepository.remove(wheel);

    return {
      message: 'گردونه با موفقیت حذف شد',
    };
  }
}