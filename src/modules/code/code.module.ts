import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Code } from './entities/code.entity';

import { Project } from '../project/entities/project.entity';

import { CodeController } from './code.controller';

import { CodeService } from './code.service';

@Module({
  imports: [TypeOrmModule.forFeature([Code, Project])],

  controllers: [CodeController],

  providers: [CodeService],

  exports: [CodeService],
})
export class CodeModule {}
