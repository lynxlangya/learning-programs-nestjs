import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
