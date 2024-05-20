// Path: lesson10/src/user/user.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts: Post[];
}
