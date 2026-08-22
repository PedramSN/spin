import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Wheel } from './entities/wheel.entity';

import { Project } from '../project/entities/project.entity';

import { WheelController } from './wheel.controller';

import { WheelService } from './wheel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wheel, Project])],

  controllers: [WheelController],

  providers: [WheelService],

  exports: [WheelService],
})
export class WheelModule {}
