"use server";

import { db } from '@/lib/firebase';
import { toBase62 } from './utils';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  setDoc,
  where,
} from 'firebase/firestore';
import * as z from 'zod';

const urlSchema = z.string().url();

async function findExistingShortUrl(longUrl: string) {
  const q = query(collection(db, 'urls'), where('originalUrl', '==', longUrl), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const expiresAt = doc.data().expiresAt as Timestamp;
    if (expiresAt.toMillis() > Date.now()) {
      return doc.id; // The document ID is the short code
    }
  }
  return null;
}

export async function createShortUrl(
  longUrl: string
): Promise<{ shortCode?: string; error?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return { error: 'Firebase project is not configured. Cannot create short URL.' };
    }

    const validation = urlSchema.safeParse(longUrl);
    if (!validation.success) {
      return { error: 'Please provide a valid URL.' };
    }

    const validatedUrl = validation.data;

    const existingShortCode = await findExistingShortUrl(validatedUrl);
    if (existingShortCode) {
      return { shortCode: existingShortCode };
    }

    const counterRef = doc(db, 'counters', 'global_url_counter');

    const newCount = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      if (!counterDoc.exists()) {
        transaction.set(counterRef, { value: 1 });
        return 1;
      }
      const newCount = counterDoc.data().value + 1;
      transaction.update(counterRef, { value: newCount });
      return newCount;
    });

    const shortCode = toBase62(newCount);

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiresAt = Timestamp.fromDate(thirtyDaysFromNow);

    const newUrlDocRef = doc(db, 'urls', shortCode);
    await setDoc(newUrlDocRef, {
      originalUrl: validatedUrl,
      createdAt: Timestamp.now(),
      expiresAt: expiresAt,
    });

    return { shortCode: shortCode };
  } catch (error) {
    console.error('Error creating short URL:', error);
    return { error: 'Could not create short URL. Please try again later.' };
  }
}
