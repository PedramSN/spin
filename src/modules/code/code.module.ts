import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Code } from './entities/code.entity';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Code, Project, User]), AuthModule],

  controllers: [CodeController],

  providers: [CodeService],

  exports: [CodeService],
})
export class CodeModule {}
