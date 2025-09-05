import { db, UserData } from './firebase-admin';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

const MAX_MESSAGES_PER_24H = 10;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
  try {
    const userRef = doc(db, 'users', ip);
    const userDoc = await getDoc(userRef);

    const now = new Date();
    const oneDayAgo = new Date(Date.now() - RATE_LIMIT_WINDOW);

    if (!userDoc.exists()) {
      // New user
      await setDoc(userRef, {
        ip,
        messageCount: 0,
        lastMessageTime: now,
        createdAt: now
      } as UserData);

      return {
        allowed: true,
        remaining: MAX_MESSAGES_PER_24H,
        resetTime: new Date(Date.now() + RATE_LIMIT_WINDOW)
      };
    }

    const userData = userDoc.data() as UserData;
    const lastMessageTime = userData.lastMessageTime;

    // Reset count if 24 hours have passed
    if (lastMessageTime < oneDayAgo) {
      await updateDoc(userRef, {
        messageCount: 0,
        lastMessageTime: now
      });

      return {
        allowed: true,
        remaining: MAX_MESSAGES_PER_24H,
        resetTime: new Date(Date.now() + RATE_LIMIT_WINDOW)
      };
    }

    // Check if under limit
    if (userData.messageCount >= MAX_MESSAGES_PER_24H) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: new Date(lastMessageTime.getTime() + RATE_LIMIT_WINDOW)
      };
    }

    return {
      allowed: true,
      remaining: MAX_MESSAGES_PER_24H - userData.messageCount,
      resetTime: new Date(lastMessageTime.getTime() + RATE_LIMIT_WINDOW)
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Allow request on error to avoid blocking users
    return {
      allowed: true,
      remaining: MAX_MESSAGES_PER_24H,
      resetTime: new Date(Date.now() + RATE_LIMIT_WINDOW)
    };
  }
}

export async function updateUserMessageCount(ip: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', ip);
    const now = new Date();

    await updateDoc(userRef, {
      messageCount: (await getDoc(userRef)).data()?.messageCount + 1 || 1,
      lastMessageTime: now
    });
  } catch (error) {
    console.error('Update user message count error:', error);
  }
}

export async function saveMessage(ip: string, message: string, response: string): Promise<void> {
  try {
    const messagesRef = collection(db, 'messages');
    const now = new Date();

    await addDoc(messagesRef, {
      userId: ip, // Using IP as user ID for simplicity
      ip,
      message,
      response,
      timestamp: now
    });
  } catch (error) {
    console.error('Save message error:', error);
  }
}
