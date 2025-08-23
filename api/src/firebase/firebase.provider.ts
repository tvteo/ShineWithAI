// src/firebase/firebase.provider.ts
import * as admin from "firebase-admin";
import * as serviceAccount from "./shine-with-ai-firebase-adminsdk-fbsvc-5737c0e087.json";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: (serviceAccount as any).project_id,
});

export const firestore = admin.firestore();
export const auth = admin.auth();
