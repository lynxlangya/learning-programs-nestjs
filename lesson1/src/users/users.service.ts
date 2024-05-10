import { Injectable } from '@nestjs/common';

export interface IUser {
  id?: number;
  name: string;
}

// TODO: 响应应该统一处理

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  findAll(): { message: string; data: IUser[] } {
    return {
      message: 'Users fetched successfully',
      data: this.users,
    };
  }

  findOne(id: number): IUser | { message: string } {
    const user = this.users.find(({ id: userId }) => userId === id);

    if (!user) {
      return {
        message: `User with id ${id} not found`,
      };
    }

    return user;
  }

  create(user: IUser) {
    // 检查是否已存在
    if (this.users.find(({ name }) => name === user.name)) {
      return {
        message: `User with name ${user.name} already exists`,
      };
    }

    // 创建
    user.id = this.users.length + 1;

    this.users.push(user);
    return {
      message: `User with id ${user.name} created successfully`,
      data: {
        ...user,
      },
    };
  }

  update(user: IUser) {
    const index = this.users.findIndex(({ id }) => id === user.id);

    // 检查是否存在
    if (index === -1) {
      return {
        message: `User with id ${user.id} not found`,
      };
    }

    this.users[index] = user;
    return {
      message: `User with id ${user.id} updated successfully`,
    };
  }

  remove(userId: number) {
    const index = this.users.findIndex(({ id }) => id === userId);

    // 检查是否存在
    if (index === -1) {
      return {
        message: `User with id ${userId} not found`,
      };
    }

    this.users.splice(index, 1);
    return {
      message: `User with id ${userId} removed successfully`,
    };
  }
}
