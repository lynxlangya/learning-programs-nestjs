import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User) {
    const validatedUser = await this.authService.validateUser(
      user.username,
      user.password,
    );

    if (typeof validatedUser === 'string') {
      return { error: validatedUser };
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }
}
