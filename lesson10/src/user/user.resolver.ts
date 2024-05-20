// Path: lesson10/src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';

const pubSub = new PubSub();
@Resolver(() => User)
export class UserResolver {
  private userList: User[] = [
    {
      id: '1',
      name: '张三',
      age: 18,
      posts: [],
    },
    {
      id: '2',
      name: '李四',
      age: 20,
      posts: [],
    },
  ];

  /**
   * 获取用户列表
   * @returns {Promise<User[]>} 用户列表
   */
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userList;
  }

  /**
   * 获取用户
   * @param {string} id 用户 ID
   * @returns {Promise<User>} 用户
   */
  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userList.find((user) => user.id === id);
  }

  /**
   * 创建用户
   * @param {string} name 用户名
   * @param {number} age 年龄
   * @returns {Promise<User>} 用户
   */
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const { name, age } = createUserInput;
    const user = {
      id: `${this.userList.length + 1}`,
      name,
      age,
      posts: [],
    };
    this.userList.push(user);

    await pubSub.publish('userCreated', { userCreated: user }); // 发布用户创建事件

    return user;
  }

  /**
   * 订阅用户创建事件
   */
  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
