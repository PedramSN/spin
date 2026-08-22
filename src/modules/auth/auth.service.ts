import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { generateUniqueId } from 'src/common/utils/uniqueId.util';
import { authMessage } from 'src/common/enums/messages.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { phone } = dto;
  
    let user = await this.userRepository.findOneBy({ phone });
  
    if (!user) {
      const uniqueId = await generateUniqueId(this.userRepository);
  
      user = this.userRepository.create({
        id: uniqueId,
        phone,
      });
  
      await this.userRepository.save(user);
    }
  
    const payload = {
      sub: user.id,
    };
  
    const accessToken = this.jwtService.sign(payload);
  
    return {
      message: authMessage.LOGIN_SUCCESS,
      accessToken,
    };
  }
}
