import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUser {
  id: number;
  name: string;
  age: string;
}

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  private users: IUser[] = [
    { id: 1, name: 'John Doe', age: '30' },
    { id: 2, name: 'Jane Doe', age: '25' },
  ];

  create(createUserDto: CreateUserDto) {
    this.users.push({ id: this.users.length + 1, ...createUserDto });
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getWelcomeMessage() {
    const msg = this.configService.get<string>('WELCOME_MESSAGE');
    const AppName = this.configService.get<string>('APP_NAME');
    return `${msg} from ${AppName}`;
  }
}
