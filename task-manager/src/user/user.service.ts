import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { error: string }> {
    // Check if the username is already taken
    const existingUser = await this.findUserByUsername(
      createUserDto.username.toLowerCase().trim(),
    );

    if (existingUser) {
      // TODO: 错误处理后期需要统一，错误状态码、错误信息等
      // 返回一个错误对象
      return {
        error: 'Username already taken - 「用户名已存在」',
      };
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        username: createUserDto.username.toLowerCase().trim(),
        password: createUserDto.password.trim(),
      },
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
