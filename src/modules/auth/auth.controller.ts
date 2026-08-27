import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Redirect,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect()
  @ApiOperation({
    summary: 'Redirect to SSO login',
  })
  login(@Query('next') next?: string) {
    return { url: this.authService.getAuthorizationUrl(next || '/') };
  }

  @Get('callback')
  @ApiOperation({ summary: 'Handle SSO callback' })
  async callback(
    @Query('code') code?: string,
    @Query('state') state?: string,
    @Query('error') error?: string,
    @Req() request?: Request,
  ) {
    if (error) {
      if (request?.headers.accept?.includes('application/json')) {
        return { error };
      }
      const callbackUrl = new URL(this.authService.getFrontendCallbackUrl());
      callbackUrl.searchParams.set('error', error);
      return { url: callbackUrl.toString() };
    }

    const result = await this.authService.loginWithCode(code || '', state);
    if (request?.headers.accept?.includes('application/json')) {
      return result;
    }

    const callbackUrl = new URL(this.authService.getFrontendCallbackUrl());
    callbackUrl.searchParams.set('access_token', result.accessToken);
    callbackUrl.searchParams.set('next', result.next);
    return { url: callbackUrl.toString() };
  }

  @Post('callback')
  @ApiOperation({ summary: 'Exchange SSO authorization code for app token' })
  async callbackApi(
    @Body('code') code?: string,
    @Body('state') state?: string,
  ) {
    return this.authService.loginWithCode(code || '', state);
  }
}
