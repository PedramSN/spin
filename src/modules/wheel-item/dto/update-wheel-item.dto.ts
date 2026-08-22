import { PartialType } from '@nestjs/swagger';
import { CreateWheelItemDto } from './create-wheel-item.dto';

export class UpdateWheelItemDto extends PartialType(CreateWheelItemDto) {}
