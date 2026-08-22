import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCodeDto {
  @ApiProperty({
    example: 123456,
    description: 'شناسه پروژه',
  })
  @IsInt()
  projectId: number;

  @ApiProperty({
    example: 'ABC821',
    description: 'کد پروژه',
  })
  @IsNotEmpty()
  code: string;
}
