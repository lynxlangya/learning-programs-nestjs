import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { successRes } from '@/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate a user's credentials 「校验用户的凭证」
   * @param username The user's username
   * @param password The user's password
   * @returns The user if the credentials are valid, null otherwise 「如果凭证有效，则返回用户，否则返回null」
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<User | string> {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) return 'User not found - 「用户不存在」';

    if (user?.password !== password) return 'Password incorrect - 「密码错误」';

    return user;
  }

  /**
   * Sign a user's JWT Token 「签发用户的 JWT Token」
   * @param user The user to sign the JWT Token for
   * @returns The signed JWT Token
   */
  async login(user: User) {
    Logger.log(`User ${user.username} is logging in...`);
    // 查找用户的角色
    const userRole = await this.usersService.findOneByUsername(user.username);
    console.log(userRole);

    if (!userRole) return { error: 'User not found - 「用户不存在」' };

    if (userRole.password !== user.password)
      return { error: 'Password incorrect - 「密码错误」' };

    const payload = {
      username: userRole.username,
      sub: userRole.id,
      role: userRole.role,
    };

    return successRes({
      access_token: this.jwtService.sign(payload),
    });
  }

  /**
   * Register a new user
   * @param user The user to register
   * @returns The registered user
   */
  async register(user: User) {
    return this.usersService.create(user);
  }
}
