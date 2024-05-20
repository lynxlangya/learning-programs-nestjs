// Path: lesson10/src/user/dto/create-user.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @Length(2, 10, { message: '用户名长度必须在 2 到 10 之间' })
  name: string;

  @Field()
  @IsNotEmpty({ message: '年龄不能为空' })
  age: number;
}
