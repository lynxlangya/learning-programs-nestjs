import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '120s' }, // 令牌有效期：60s
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
