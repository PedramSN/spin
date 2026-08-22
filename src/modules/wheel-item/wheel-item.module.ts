import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WheelItem } from './entities/wheel-item.entity';

import { Wheel } from '../wheel/entities/wheel.entity';

import { WheelItemController } from './wheel-item.controller';

import { WheelItemService } from './wheel-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([WheelItem, Wheel])],

  controllers: [WheelItemController],

  providers: [WheelItemService],

  exports: [WheelItemService],
})
export class WheelItemModule {}
