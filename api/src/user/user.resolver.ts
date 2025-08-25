import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { User } from './user.model';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  // -> Thêm query trả về user hiện tại (bảo vệ bằng FirebaseAuthGuard)
  @Query(() => User)
  @UseGuards(FirebaseAuthGuard)
  async currentUser(
    @Context('req') req: { user: { uid: string } },
  ): Promise<User> {
    const userId = req.user.uid;
    return this.userService.findOne(userId);
  }

  @Mutation(() => User)
  @UseGuards(FirebaseAuthGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Context('req') req: { user: { uid: string } },
  ): Promise<User> {
    const userId = req.user.uid; // ✅ UID lấy từ Firebase token
    return this.userService.updateUser(userId, input);
  }
}
