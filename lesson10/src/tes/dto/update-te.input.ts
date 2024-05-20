import { CreateTeInput } from './create-te.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeInput extends PartialType(CreateTeInput) {
  @Field(() => Int)
  id: number;
}
