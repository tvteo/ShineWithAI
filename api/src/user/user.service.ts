import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { firestore } from '../firebase/firebase.provider';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class UserService {
  private db: Firestore;

  constructor() {
    this.db = firestore;
  }

  /**
   * Tạo user mới khi login lần đầu bằng Gmail
   */
  async createUser(data: Partial<User>): Promise<User> {
    const userRef = this.db.collection('users').doc(data.id || '');
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const newUser: User = {
        id: data.id!,
        email: data.email!,
        name: data.name!,
        photoURL: data.photoURL ?? undefined,
        birthday: undefined,
        phone: undefined,
        address: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await userRef.set(newUser);
      return newUser;
    }

    // Nếu user đã tồn tại → trả về dữ liệu cũ
    return snapshot.data() as User;
  }

  /**
   * Lấy tất cả user
   */
  async findAll(): Promise<User[]> {
    const snapshot = await this.db.collection('users').get();
    return snapshot.docs.map((doc) => doc.data() as User);
  }

  /**
   * Lấy 1 user theo id
   */
  async findOne(id: string): Promise<User> {
    const userRef = this.db.collection('users').doc(id);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { id: snapshot.id, ...snapshot.data() } as User;
  }

  /**
   * Update thông tin user (profile)
   * id lấy từ Firebase token (resolver truyền vào)
   */
  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    const userRef = this.db.collection('users').doc(id);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedData = {
      ...input,
      updatedAt: new Date(),
    };

    await userRef.set(updatedData, { merge: true });

    const newSnapshot = await userRef.get();
    return { id: newSnapshot.id, ...newSnapshot.data() } as User;
  }

  /**
   * (Optional) Xoá user
   */
  async deleteUser(id: string): Promise<boolean> {
    const userRef = this.db.collection('users').doc(id);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await userRef.delete();
    return true;
  }
}
