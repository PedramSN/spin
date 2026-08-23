import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  
  import { User } from 'src/modules/user/entities/user.entity';
  
  @Injectable()
  export class IsAdminGuard implements CanActivate {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const request =
        context
          .switchToHttp()
          .getRequest();
  
      const userId = request.user?.sub;
  
      if (!userId) {
        throw new ForbiddenException(
          'دسترسی غیرمجاز است',
        );
      }
  
      const user =
        await this.userRepository.findOneBy({
          id: userId,
        });
  
      if (!user) {
        throw new ForbiddenException(
          'کاربر پیدا نشد',
        );
      }
  
      if (!user.isAdmin) {
        throw new ForbiddenException(
          'شما دسترسی ادمین ندارید',
        );
      }
  
      return true;
    }
  }