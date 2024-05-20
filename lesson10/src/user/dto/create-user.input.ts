// Path: lesson10/src/user/dto/create-user.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  age: number;
}
