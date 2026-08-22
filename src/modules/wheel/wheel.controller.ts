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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { WheelService } from './wheel.service';

import { CreateWheelDto } from './dto/create-wheel.dto';

import { UpdateWheelDto } from './dto/update-wheel.dto';

@ApiTags('Wheel')
@Controller('wheels')
export class WheelController {
  constructor(
    private readonly wheelService: WheelService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'ایجاد گردونه',
  })
  @ApiResponse({
    status: 201,
    description: 'گردونه با موفقیت ایجاد شد',
  })
  create(
    @Body() dto: CreateWheelDto,
  ) {
    return this.wheelService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'دریافت تمام گردونه‌ها',
  })
  findAll() {
    return this.wheelService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'دریافت گردونه',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.wheelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'بروزرسانی گردونه',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWheelDto,
  ) {
    return this.wheelService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'حذف گردونه',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.wheelService.remove(id);
  }
}