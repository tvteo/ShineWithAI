import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from './user.model';

@Injectable()
export class UserService {
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    this.firestore = admin.firestore();
  }

  async createUser(data: User): Promise<User> {
    await this.firestore.collection('users').doc(data.uid).set(data);
    return data;
  }

  async findByUid(uid: string): Promise<User | null> {
    const doc = await this.firestore.collection('users').doc(uid).get();
    if (!doc.exists) return null;
    return doc.data() as User;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.firestore.collection('users').get();
    return snapshot.docs.map(doc => doc.data() as User);
  }
}
