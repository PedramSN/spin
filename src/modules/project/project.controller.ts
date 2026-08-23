import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProjectService } from './project.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@ApiTags('Project')
@Controller('projects')
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
  create(@Body() dto: CreateProjectDto) {
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
