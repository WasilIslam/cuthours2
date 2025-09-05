# Firebase Setup for AI Chat

## Environment Variables Required

Create a `.env.local` file in your project root and add these variables:

```env
# xAI API
XAI_API_KEY=your_xai_api_key_here
# GROK_API_KEY is also supported for backward compatibility

# Firebase Configuration (from Firebase Console - Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Firestore Database (Create database in test mode)
4. Go to Project Settings (gear icon)
5. Scroll down to "Your apps" section
6. Click "Add app" and select Web (</>) icon
7. Register your app with a nickname
8. Copy the Firebase configuration object values to your environment variables
9. Make sure Firestore Security Rules allow reads/writes (for testing, you can use open rules)

## Features Implemented

- ✅ **IP-based User Tracking**: Each IP gets tracked separately
- ✅ **24-hour Rate Limiting**: Max 10 messages per IP per 24 hours
- ✅ **Firebase Storage**: All conversations saved to Firestore
- ✅ **Config Integration**: AI uses your config.json data
- ✅ **Latest xAI Integration**: Using grok-2-1212 model with latest API
- ✅ **Enhanced Headers**: X-Client-Name and X-Client-Version for better API tracking
- ✅ **Error Handling**: Proper rate limit and API error responses
- ✅ **Simple Code**: Clean, maintainable implementation

## Database Structure

### Users Collection
```json
{
  "ip": "192.168.1.1",
  "messageCount": 5,
  "lastMessageTime": "2024-01-01T12:00:00Z",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Messages Collection
```json
{
  "id": "auto-generated",
  "userId": "192.168.1.1",
  "ip": "192.168.1.1",
  "message": "User's message",
  "response": "AI response",
  "timestamp": "2024-01-01T12:00:00Z"
}
```
