import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  userId: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * 根据用户信息生成 JWT Token
   * @param user 用户信息
   */
  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // /**
  //  * 验证 JWT Token
  //  * @param token JWT Token
  //  */
  // async validateToken(token: string) {
  //   return this.jwtService.verify(token);
  // }

  // /**
  //  * 验证用户信息
  //  * @param username 用户名
  //  * @param password 密码
  //  */
  // async validateUser(username: string, password: string): Promise<User> {
  //   // 这里应该查询数据库，验证用户名和密码是否正确
  //   // 如果正确，返回用户信息；否则，返回 null
  //   const user = { userId: 1, username: 'admin' };

  //   if (user && password === 'admin') {
  //     return user;
  //   }

  //   return null;
  // }
}
