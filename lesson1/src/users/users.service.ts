import { Injectable } from '@nestjs/common';

export interface IUser {
  id: number;
  name: string;
}

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    return this.users.find(({ id: userId }) => userId === id);
  }

  create(user: IUser) {
    this.users.push(user);
    return {
      message: `User with id ${user.name} created successfully`,
      ...user,
    };

    // TODO: 响应应该统一处理
  }

  update(user: IUser) {
    const index = this.users.findIndex(({ id }) => id === user.id);
    this.users[index] = user;
    return {
      message: `User with id ${user.id} updated successfully`,
    };
  }

  remove(userId: number) {
    const index = this.users.findIndex(({ id }) => id === userId);
    this.users.splice(index, 1);
    return {
      message: `User with id ${userId} removed successfully`,
    };
  }
}
