import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Wheel } from './entities/wheel.entity';

import { Project } from '../project/entities/project.entity';

import { WheelController } from './wheel.controller';

import { WheelService } from './wheel.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wheel, Project, User])],

  controllers: [WheelController],

  providers: [WheelService],

  exports: [WheelService],
})
export class WheelModule {}
