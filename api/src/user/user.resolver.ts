/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
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
  async currentUser(@Context() ctx: any): Promise<User> {
    // Hỗ trợ nhiều dạng context: ctx.req.user (thường), hoặc ctx.user (guard có thể gán trực tiếp)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const req = (ctx.req ?? ctx.request) as Record<string, any> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const user = req?.user ?? ctx.user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user || !user.uid) {
      throw new UnauthorizedException(req);
    }

    const userId = user.uid as string;
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
