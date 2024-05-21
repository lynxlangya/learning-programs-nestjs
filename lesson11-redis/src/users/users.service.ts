import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createUserDto: CreateUserDto) {
    /**
     * 将用户信息存入 redis 缓存
     */
    await this.cacheManager.set(
      `${createUserDto.name}`,
      createUserDto,
      1000 * 60 * 1,
    );

    return {
      message: 'This action adds a new user',
      data: createUserDto,
    };
  }

  async findUserByName(name: string) {
    const user = await this.cacheManager.get(name);
    return {
      message: 'This action returns a user by name',
      data: user || '用户不存在',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto:', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
