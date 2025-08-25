// src/firebase/firebase.provider.ts
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from './shine-with-ai-firebase-adminsdk-fbsvc-2a1d1d7977.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export const firestore = admin.firestore();
