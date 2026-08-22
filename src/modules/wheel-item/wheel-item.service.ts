import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WheelItem } from './entities/wheel-item.entity';

import { Wheel } from '../wheel/entities/wheel.entity';

import { CreateWheelItemDto } from './dto/create-wheel-item.dto';

import { UpdateWheelItemDto } from './dto/update-wheel-item.dto';

import { generateUniqueId } from 'src/common/utils/uniqueId.util';

@Injectable()
export class WheelItemService {
  constructor(
    @InjectRepository(WheelItem)
    private readonly wheelItemRepository: Repository<WheelItem>,

    @InjectRepository(Wheel)
    private readonly wheelRepository: Repository<Wheel>,
  ) {}

  async create(dto: CreateWheelItemDto) {
    const { title, type, value, probability, stock, wheelId } = dto;

    const wheel = await this.wheelRepository.findOneBy({
      id: wheelId,
    });

    if (!wheel) {
      throw new NotFoundException('گردونه پیدا نشد');
    }

    const uniqueId = await generateUniqueId(this.wheelItemRepository);

    const wheelItem = this.wheelItemRepository.create({
      id: uniqueId,
      title,
      type,
      value,
      probability,
      stock,
      wheelId,
    });

    await this.wheelItemRepository.save(wheelItem);

    return {
      message: 'آیتم با موفقیت ایجاد شد',
      data: wheelItem,
    };
  }

  async findAll() {
    const items = await this.wheelItemRepository.find();

    return {
      data: items,
    };
  }

  async findOne(id: number) {
    const item = await this.wheelItemRepository.findOneBy({
      id,
    });

    if (!item) {
      throw new NotFoundException('آیتم پیدا نشد');
    }

    return {
      data: item,
    };
  }

  async update(id: number, dto: UpdateWheelItemDto) {
    const item = await this.wheelItemRepository.findOneBy({
      id,
    });

    if (!item) {
      throw new NotFoundException('آیتم پیدا نشد');
    }

    if (dto.wheelId) {
      const wheel = await this.wheelRepository.findOneBy({
        id: dto.wheelId,
      });

      if (!wheel) {
        throw new NotFoundException('گردونه پیدا نشد');
      }
    }

    Object.assign(item, dto);

    await this.wheelItemRepository.save(item);

    return {
      message: 'آیتم با موفقیت بروزرسانی شد',
      data: item,
    };
  }

  async remove(id: number) {
    const item = await this.wheelItemRepository.findOneBy({
      id,
    });

    if (!item) {
      throw new NotFoundException('آیتم پیدا نشد');
    }

    await this.wheelItemRepository.remove(item);

    return {
      message: 'آیتم با موفقیت حذف شد',
    };
  }
}
