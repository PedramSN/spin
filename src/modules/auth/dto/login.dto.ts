import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '09123456789',
    description: 'شماره موبایل کاربر',
  })
  @IsMobilePhone('fa-IR')
  phone: string;
}