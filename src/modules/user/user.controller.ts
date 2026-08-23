import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  
}
