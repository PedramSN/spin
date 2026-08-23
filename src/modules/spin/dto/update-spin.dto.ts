import { PartialType } from '@nestjs/swagger';
import { SpinDto } from './create-spin.dto';

export class UpdateSpinDto extends PartialType(SpinDto) {}
