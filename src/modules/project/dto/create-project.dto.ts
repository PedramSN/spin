import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'کمپین تابستانه',
    description: 'نام پروژه',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'summer-campaign',
    description: 'اسلاگ یکتای پروژه',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}