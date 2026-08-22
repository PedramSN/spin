import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateWheelDto {
  @ApiProperty({
    example: 'گردونه اصلی',
    description: 'نام گردونه',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 123456,
    description: 'شناسه پروژه',
  })
  @IsInt()
  projectId: number;
}