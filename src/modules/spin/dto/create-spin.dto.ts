import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SpinDto {
  @ApiProperty({
    example: 'ABC821',
    description: 'کد استفاده از پروژه',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 123456,
    description: 'شناسه گردونه',
  })
  @IsInt()
  wheelId: number;
}
