import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  id: string; // id của user trong Firestore (ví dụ uid Firebase)

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;
}
