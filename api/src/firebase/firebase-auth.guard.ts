/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/firebase/firebase-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 👉 Chuyển sang GQL context
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const req = ctx.getContext().req;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const authHeader = req.headers?.authorization;
    if (!authHeader) throw new UnauthorizedException('Thiếu token');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token = authHeader.replace('Bearer ', '');

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const decodedToken = await admin.auth().verifyIdToken(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.user = decodedToken; // 👈 Gắn user vào request để resolver dùng
      return true;
    } catch {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
