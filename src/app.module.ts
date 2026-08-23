import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './config/typeorm-db-config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { WheelModule } from './modules/wheel/wheel.module';
import { WheelItemModule } from './modules/wheel-item/wheel-item.module';
import { CodeModule } from './modules/code/code.module';
import { SpinModule } from './modules/spin/spin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load : configurations
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [ConfigService],
    }),

    UserModule,

    AuthModule,

    ProjectModule,

    WheelModule,

    WheelItemModule,

    CodeModule,

    SpinModule,
  ],

  

})
export class AppModule {}
