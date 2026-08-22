import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateWheelItemDto {
  @ApiProperty({
    example: '20% تخفیف',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'discount',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: '20',
    required: false,
  })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({
    example: 30,
    description: 'احتمال برنده شدن',
  })
  @IsNumber()
  @Min(0)
  probability: number;

  @ApiProperty({
    example: 100,
    required: false,
    nullable: true,
    description: 'موجودی؛ null یعنی نامحدود',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number | null;

  @ApiProperty({
    example: 123456,
  })
  @IsNumber()
  wheelId: number;
}