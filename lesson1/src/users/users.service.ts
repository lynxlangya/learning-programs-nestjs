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

  findAll(): {
    message: string;
    data: IUser[];
  } {
    // return this.users;
    return {
      message: 'Users fetched successfully',
      data: this.users,
    };
  }

  findOne(id: number): IUser | { message: string } {
    if (!checkId(id, this.users)) {
      return {
        message: `User with id ${id} not found`,
      };
    }

    return this.users.find(({ id: userId }) => userId === id);
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
    if (!checkId(user.id, this.users)) {
      return {
        message: `User with id ${user.id} not found`,
      };
    }

    this.users[index] = user;
    return {
      message: `User with id ${user.id} updated successfully`,
    };
  }

  remove(id: number) {
    const index = this.users.findIndex(({ id }) => id === id);

    // 检查是否存在
    if (!checkId(id, this.users)) {
      return {
        message: `User with id ${id} not found`,
      };
    }

    this.users.splice(index, 1);
    return {
      message: `User with id ${id} removed successfully`,
    };
  }
}

// 封装公共方法，检查 id 是否存在
function checkId(id: number, users: IUser[]) {
  const index = users.findIndex(({ id: userId }) => userId === id);

  return index === -1;
}
