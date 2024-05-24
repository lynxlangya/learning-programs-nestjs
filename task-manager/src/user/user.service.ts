import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';
import { ApiResponse } from '@/common/interfaces';
import { successRes, failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | ApiResponse<null | string>> {
    // Check if the username is already taken
    const existingUser = await this.findUserByUsername(
      createUserDto.username.toLowerCase().trim(),
    );

    if (existingUser) {
      return failRes(
        ServerResponseCode.BAD_REQUEST,
        'Username already taken - 「用户名已存在」',
      );
    }

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        username: createUserDto.username.toLowerCase().trim(),
        password: createUserDto.password.trim(),
      },
    });

    return successRes(null);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findAll(query: QueryUserDto): Promise<{
    list: User[];
    total: string;
    pageSize: string;
    pageNum: string;
  }> {
    const { pageNum, pageSize, name, email, username } = query;
    const where: any = {};
    if (name) where.name = { contains: name };
    if (email) where.email = { contains: email };
    if (username) where.username = { contains: username };

    const [list, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        take: +pageSize,
        skip: (+pageNum - 1) * +pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      list,
      total: String(total),
      pageSize,
      pageNum,
    };
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
