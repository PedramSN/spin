import { PartialType } from '@nestjs/swagger';
import { CreateWheelDto } from './create-wheel.dto';

export class UpdateWheelDto extends PartialType(CreateWheelDto) {}
