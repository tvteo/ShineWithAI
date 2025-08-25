// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseProviders } from './firebase.provider';

@Module({
  providers: [...FirebaseProviders],
  exports: [...FirebaseProviders],
})
export class FirebaseModule {}
