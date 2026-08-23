import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Spin } from './entities/spin.entity';

import { User } from '../user/entities/user.entity';
import { Code } from '../code/entities/code.entity';
import { Project } from '../project/entities/project.entity';
import { Wheel } from '../wheel/entities/wheel.entity';
import { WheelItem } from '../wheel-item/entities/wheel-item.entity';

import { SpinDto } from './dto/create-spin.dto';

import { generateUniqueId } from 'src/common/utils/uniqueId.util';

@Injectable()
export class SpinService {
  constructor(
    @InjectRepository(Spin)
    private readonly spinRepository: Repository<Spin>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Wheel)
    private readonly wheelRepository: Repository<Wheel>,

    @InjectRepository(WheelItem)
    private readonly wheelItemRepository: Repository<WheelItem>,
  ) {}

  async spin(userId: number, dto: SpinDto) {
    const { code, wheelId } = dto;

    // 1. بررسی User
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }

    // 2. پیدا کردن Code
    const codeEntity = await this.codeRepository.findOne({
      where: {
        code,
      },
      relations: {
        project: true,
      },
    });

    if (!codeEntity) {
      throw new NotFoundException('کد پیدا نشد');
    }

    // 3. بررسی فعال بودن Code
    if (!codeEntity.isActive) {
      throw new BadRequestException('این کد غیرفعال است');
    }

    // 4. Project مربوط به Code
    const project = codeEntity.project;

    if (!project) {
      throw new NotFoundException('پروژه پیدا نشد');
    }

    // 5. بررسی Spin قبلی
    const previousSpin = await this.spinRepository.findOneBy({
      userId,
      projectId: project.id,
    });

    if (previousSpin) {
      throw new ConflictException(
        'شما قبلاً در این پروژه گردونه را چرخانده‌اید',
      );
    }

    // 6. بررسی Wheel
    const wheel = await this.wheelRepository.findOneBy({
      id: wheelId,
    });

    if (!wheel) {
      throw new NotFoundException('گردونه پیدا نشد');
    }

    if (!wheel.isActive) {
      throw new BadRequestException('این گردونه غیرفعال است');
    }

    // 7. اطمینان از تعلق Wheel به Project
    if (wheel.projectId !== project.id) {
      throw new BadRequestException('این گردونه متعلق به این پروژه نیست');
    }

    // 8. گرفتن آیتم‌های فعال
    const items = await this.wheelItemRepository.find({
      where: {
        wheelId: wheel.id,
        isActive: true,
      },
    });

    if (!items.length) {
      throw new BadRequestException('این گردونه آیتم فعالی ندارد');
    }

    // 9. انتخاب تصادفی
    const randomIndex = Math.floor(Math.random() * items.length);

    const selectedItem = items[randomIndex];

    // 10. ساخت Spin
    const uniqueId = await generateUniqueId(this.spinRepository);

    const spin = this.spinRepository.create({
      id: uniqueId,
      userId,
      projectId: project.id,
      wheelId: wheel.id,
      wheelItemId: selectedItem.id,
      codeId: codeEntity.id,
    });

    await this.spinRepository.save(spin);

    return {
      message: 'گردونه با موفقیت چرخانده شد',
      data: {
        item: selectedItem,
      },
    };
  }
}
