import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { RolesGuard } from '../guard/roles/roles.guard';
import { Roles } from '../decorator/roles/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update(+id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(+id);
  }
}
