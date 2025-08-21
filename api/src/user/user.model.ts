import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  uid: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  photoURL?: string;
}
