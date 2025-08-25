// src/firebase/firebase.provider.ts
import * as admin from 'firebase-admin';
import { Provider } from '@nestjs/common';
import serviceAccount from './shine-with-ai-firebase-adminsdk-fbsvc-5737c0e087.json';

export const FirebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore(); // 👈 export firestore instance

export const FirebaseProviders: Provider[] = [
  {
    provide: 'FIREBASE_ADMIN',
    useValue: FirebaseAdmin,
  },
  {
    provide: 'FIRESTORE',
    useValue: firestore,
  },
];
