import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  import * as jwt from 'jsonwebtoken';
  
  interface AccessTokenPayload {
    sub: number;
    iat?: number;
    exp?: number;
  }
  
  export type AuthenticatedRequest = Request & {
    user?: AccessTokenPayload;
  };
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    private readonly jwtSecret: string;
  
    constructor(
      private readonly configService: ConfigService,
    ) {
      this.jwtSecret = this.configService.get<string>(
        'jwt.accessTokenSecret',
      )!;
  
      if (!this.jwtSecret) {
        throw new Error('JWT access token secret is not configured');
      }
    }
  
    canActivate(context: ExecutionContext): boolean {
      const request =
        context
          .switchToHttp()
          .getRequest<AuthenticatedRequest>();
  
      const token = this.extractToken(request);
  
      if (!token) {
        throw new UnauthorizedException(
          'توکن خالی یا نامعتبر است',
        );
      }
  
      try {
        const decoded = jwt.verify(
          token,
          this.jwtSecret,
        );
  
        if (
          typeof decoded !== 'object' ||
          decoded === null
        ) {
          throw new UnauthorizedException(
            'توکن نامعتبر است',
          );
        }
  
        if (typeof decoded.sub !== 'number') {
          throw new UnauthorizedException(
            'توکن ناقص است',
          );
        }
  
        request.user = {
          sub: decoded.sub,
          iat: decoded.iat,
          exp: decoded.exp,
        };
  
        return true;
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }
  
        throw new UnauthorizedException(
          'توکن نامعتبر یا منقضی شده',
        );
      }
    }
  
    private extractToken(
      request: Request,
    ): string | null {
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        return null;
      }
  
      const [bearer, token] = authHeader.split(' ');
  
      if (
        bearer?.toLowerCase() !== 'bearer' ||
        !token
      ) {
        return null;
      }
  
      return token;
    }
  }