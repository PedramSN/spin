import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    status: 200,
    description: 'ورود با موفقیت انجام شد.',
  })
  @ApiResponse({
    status: 400,
    description: 'شماره موبایل نامعتبر است.',
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}