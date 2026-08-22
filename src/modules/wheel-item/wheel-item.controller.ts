import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { WheelItemService } from './wheel-item.service';

import { CreateWheelItemDto } from './dto/create-wheel-item.dto';

import { UpdateWheelItemDto } from './dto/update-wheel-item.dto';

@ApiTags('Wheel Item')
@Controller('wheel-items')
export class WheelItemController {
  constructor(
    private readonly wheelItemService: WheelItemService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'ایجاد آیتم گردونه',
  })
  create(
    @Body() dto: CreateWheelItemDto,
  ) {
    return this.wheelItemService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'دریافت تمام آیتم‌ها',
  })
  findAll() {
    return this.wheelItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'دریافت آیتم',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.wheelItemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'بروزرسانی آیتم',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: UpdateWheelItemDto,
  ) {
    return this.wheelItemService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'حذف آیتم',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.wheelItemService.remove(id);
  }
}