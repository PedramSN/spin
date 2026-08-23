import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Spin } from './entities/spin.entity';

import { User } from '../user/entities/user.entity';
import { Code } from '../code/entities/code.entity';
import { Project } from '../project/entities/project.entity';
import { Wheel } from '../wheel/entities/wheel.entity';
import { WheelItem } from '../wheel-item/entities/wheel-item.entity';

import { SpinController } from './spin.controller';

import { SpinService } from './spin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Spin, User, Code, Project, Wheel, WheelItem]),
  ],

  controllers: [SpinController],

  providers: [SpinService],

  exports: [SpinService],
})
export class SpinModule {}
