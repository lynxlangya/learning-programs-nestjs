import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return 'This action adds a new user';
  }

  async findAll() {
    const userCached = await this.cacheManager.get('USER_CACHE_KEY');
    console.log('userCached', userCached);
    if (userCached) {
      return {
        from: 'cache',
        data: userCached,
      };
    }

    /**
     * if using cache-manager v4, provide the ttl in seconds
     * if using cache-manager v5, provide the ttl in milliseconds
     */
    await this.cacheManager.set('USER_CACHE_KEY', this.users, 1000 * 60 * 5);
    return {
      from: 'db',
      data: this.users,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
