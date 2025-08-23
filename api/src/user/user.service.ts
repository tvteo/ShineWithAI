import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from './user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { firestore } from "../firebase/firebase.provider";

@Injectable()
export class UserService {
  constructor() {

  }

  async createUser(data: User): Promise<User> {
    await firestore.collection('users').doc(data.id).set(data);
    return data;
  }


  async findAll(): Promise<User[]> {
    const snapshot = await firestore.collection('users').get();
    return snapshot.docs.map(doc => doc.data() as User);
  }
  async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...rest } = input;
    const userRef = firestore.collection('users').doc(id);

    // Cập nhật Firestore
    await userRef.set(rest, { merge: true });

    const snapshot = await userRef.get();
    return { id: snapshot.id, ...snapshot.data() } as User;
  }
}
