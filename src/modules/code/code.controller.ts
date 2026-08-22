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

import { CodeService } from './code.service';

import { CreateCodeDto } from './dto/create-code.dto';

import { UpdateCodeDto } from './dto/update-code.dto';

@ApiTags('Code')
@Controller('codes')
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'ایجاد کد',
  })
  create(
    @Body() dto: CreateCodeDto,
  ) {
    return this.codeService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'دریافت تمام کدها',
  })
  findAll() {
    return this.codeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'دریافت کد',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.codeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'بروزرسانی کد',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: UpdateCodeDto,
  ) {
    return this.codeService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'حذف کد',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.codeService.remove(id);
  }
}