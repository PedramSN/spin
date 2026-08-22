import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProjectService } from './project.service';

import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'ایجاد پروژه جدید',
  })
  @ApiResponse({
    status: 201,
    description: 'پروژه با موفقیت ایجاد شد',
  })
  @ApiResponse({
    status: 409,
    description: 'Slug از قبل وجود دارد',
  })
  create(
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'دریافت لیست پروژه‌ها',
  })
  findAll() {
    return this.projectService.findAll();
  }
}