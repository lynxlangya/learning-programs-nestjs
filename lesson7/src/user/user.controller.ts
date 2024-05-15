import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(Number(id));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }
}
