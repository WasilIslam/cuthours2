import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface UserData {
  ip: string;
  messageCount: number;
  lastMessageTime: Date;
  createdAt: Date;
}

export interface MessageData {
  id: string;
  userId: string;
  ip: string;
  message: string;
  response: string;
  timestamp: Date;
}

export interface BotData {
  id: string;
  websiteUrl: string;
  paths: string[];
  content: {
    raw: string;
    aiProcessed: string; // JSON string with structured data from xAI
    pages: {
      url: string;
      title: string;
      content: string;
      extractedAt: Date;
    }[];
  };
  metadata: {
    totalPages: number;
    contentLength: number;
    createdAt: Date;
    userIp: string;
    recommendedPaths: string[];
  };
}