import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('uid') uid: string,
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('photoURL', { nullable: true }) photoURL?: string,
  ): Promise<User> {
    return this.userService.createUser({ uid, email, name, photoURL });
  }

  @Query(() => User, { nullable: true })
  async user(@Args('uid') uid: string): Promise<User | null> {
    return this.userService.findByUid(uid);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
