import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  photoURL?: string;
}
