import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService, User } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: User): Promise<{ access_token: string }> {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate')
  async validateToken() {
    return 'Token is valid.';
  }
}
