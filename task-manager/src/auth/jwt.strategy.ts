/**
 * JwtStrategy 是 Passport 的一个策略，用于验证用户的 JWT Token。
 * 并从中提取用户信息，以便在请求处理过程中使用。
 */
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@/user/user.service';
import { failRes } from '@/common/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT Token
      ignoreExpiration: false, // 不忽略 Token 过期
      secretOrKey: process.env.JWT_SECRET, // 用于验证 Token 签名的密钥
    });
  }

  /**
   * 验证 JWT Token
   * @param payload JWT Token 的 payload
   * @param sub 用户 ID
   * @param username 用户名
   * @param iat Token 签发时间
   * @param exp Token 过期时间
   */
  async validate(payload: {
    sub: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
  }) {
    // 基于 JWT Token 的 payload 生成用户信息对象
    Logger.log(`JWT payload: ${JSON.stringify(payload)}`);

    const user = await this.userService.findOneById(payload.sub);
    if (!user) {
      return failRes(401, 'Unauthorized - 「未授权」');
    }

    return user;
  }
}
