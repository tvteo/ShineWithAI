import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('id') id: string,
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('photoURL', { nullable: true }) photoURL?: string,
  ): Promise<User> {
    return this.userService.createUser({ id, email, name, photoURL });
  }


  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(input);
  }
}
