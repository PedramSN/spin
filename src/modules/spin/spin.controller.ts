import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SpinService } from './spin.service';

import { SpinDto } from './dto/create-spin.dto';

import { AuthGuard } from '../../common/guards/auth.guard';
import type { AuthenticatedRequest } from '../../common/guards/auth.guard';



@ApiTags('Spin')
@ApiBearerAuth()
@Controller('spin')
export class SpinController {
  constructor(private readonly spinService: SpinService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'چرخاندن گردونه',
  })
  spin(@Req() req: AuthenticatedRequest, @Body() dto: SpinDto) {
    return this.spinService.spin(req.user!.sub, dto);
  }
}
