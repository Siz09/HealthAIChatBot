# MindEase - Student Mental Health Chatbot

A supportive AI-powered mental health chatbot designed specifically for students, featuring mood tracking, real-time chat support, and a beautiful, responsive interface.

## Features

- 🤖 **AI-Powered Chat Support**: Empathetic conversations powered by OpenAI's GPT-4
- 📊 **Mood Tracking**: Log and track your daily mood with notes and history
- 🌙 **Dark/Light Mode**: Comfortable viewing in any lighting condition
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Updates**: Live chat and mood data synchronization
- 🔐 **Anonymous Authentication**: No personal data required, uses Firebase anonymous auth
- 💾 **Persistent Storage**: Chat history and mood logs saved securely in Firebase

## Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with modern design principles

### Backend
- **Node.js & Express** - API server
- **OpenAI API** - AI chat responses
- **Firebase Firestore** - Real-time database
- **Firebase Auth** - Anonymous authentication

### Deployment
- **Firebase Hosting** - Frontend deployment
- **GitHub Actions** - CI/CD pipeline

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Firebase Project** - Set up at [Firebase Console](https://console.firebase.google.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd student-mental-health-chatbot
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add your OpenAI API key to `backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

### 4. Firebase Configuration

The Firebase configuration is already set up in `src/firebase-config.js`. If you want to use your own Firebase project:

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication with Anonymous sign-in
4. Replace the config in `src/firebase-config.js` with your project's config

### 5. Firestore Security Rules

Set up these security rules in your Firebase Console under Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own chat messages
    match /chats/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Allow authenticated users to read/write their own mood logs
    match /mood_logs/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Running the Application

### Development Mode

You need to run both the frontend and backend servers:

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:4000`

#### Terminal 2 - Start Frontend Development Server
```bash
npm start
```
The frontend will run on `http://localhost:3000`

### Production Build

```bash
# Build the frontend for production
npm run build

# The build files will be in the 'build' directory
# Deploy these files to your hosting service
```

## Project Structure

```
student-mental-health-chatbot/
├── public/                     # Static files
├── src/
│   ├── components/            # React components
│   │   ├── mentalHealthChatbot.js    # Main chatbot interface
│   │   ├── MoodTracker.js            # Mood tracking container
│   │   ├── MoodPicker.js             # Mood selection component
│   │   └── MoodHistory.js            # Mood history display
│   ├── contexts/              # React contexts
│   │   └── chat-context.js           # Chat state management
│   ├── styles/                # CSS files
│   │   ├── chatbot.css              # Main chatbot styles
│   │   └── mood-tracker.css         # Mood tracker styles
│   ├── utils/                 # Utility functions
│   │   ├── date.js                  # Date formatting utilities
│   │   └── data-utils.js            # Data manipulation utilities
│   ├── firebase-config.js     # Firebase configuration
│   ├── App.js                 # Main App component
│   └── index.js              # React entry point
├── backend/                   # Express.js backend
│   ├── server.js             # Main server file
│   ├── moodRoutes.js         # Mood tracking API routes
│   └── package.json          # Backend dependencies
├── api/                      # Serverless functions (alternative)
│   └── chat.js              # OpenAI chat endpoint
├── .github/workflows/        # GitHub Actions CI/CD
└── firebase.json            # Firebase hosting config
```

## API Endpoints

### Chat API
- **POST** `/api/chat`
  - Body: `{ "message": "user message" }`
  - Response: `{ "reply": "AI response" }`

### Mood Tracking API
- **POST** `/api/mood`
  - Body: `{ "userId": "string", "mood": "string", "note": "string", "emoji": "string" }`
  - Response: `{ "message": "Mood logged", "id": "document_id" }`

- **GET** `/api/mood/:userId`
  - Response: Array of mood log objects

## Features Guide

### Chat Interface
- Type messages in the input field at the bottom
- Press Enter or click the send button to send messages
- The AI responds with supportive, empathetic messages
- Chat history is automatically saved and persists across sessions

### Mood Tracking
1. Click on the "Mood" tab in the sidebar
2. Select your current mood from the emoji options
3. Optionally add a note describing how you're feeling
4. Click "Save Mood" to log your entry
5. View your mood history below the picker

### Theme Switching
- Click the sun/moon icon in the header to toggle between light and dark modes
- Your preference is saved locally

### Responsive Design
- The interface automatically adapts to different screen sizes
- On mobile devices, the sidebar becomes a full-screen overlay

## Troubleshooting

### Common Issues

#### 1. Proxy Error: Could not proxy request /api/chat
**Problem**: The backend server isn't running
**Solution**: Make sure to start the backend server first:
```bash
cd backend
npm start
```

#### 2. OpenAI API Key Error
**Problem**: Missing or invalid OpenAI API key
**Solution**: 
- Check that `OPENAI_API_KEY` is set in `backend/.env`
- Verify your API key is valid and has sufficient credits
- Ensure there are no extra spaces or quotes around the key

#### 3. Firebase Connection Issues
**Problem**: Authentication or database errors
**Solution**:
- Verify Firebase configuration in `src/firebase-config.js`
- Check that Firestore and Authentication are enabled in Firebase Console
- Ensure security rules are properly configured

#### 4. Build Errors
**Problem**: npm run build fails
**Solution**:
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for any TypeScript or linting errors
- Ensure all dependencies are compatible

### Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Code Splitting**: The app already uses React's lazy loading
3. **Caching**: Firebase automatically handles caching for better performance
4. **Bundle Analysis**: Run `npm run build` and check the bundle size

## Deployment

### Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Build and deploy:
```bash
npm run build
firebase deploy
```

### Alternative Deployment Options

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Similar to Netlify with excellent React support
- **GitHub Pages**: For static hosting (frontend only)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Security Considerations

- API keys are stored securely in environment variables
- Firebase security rules prevent unauthorized data access
- Anonymous authentication protects user privacy
- All data is encrypted in transit and at rest

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the [Firebase documentation](https://firebase.google.com/docs)
3. Check [OpenAI API documentation](https://platform.openai.com/docs)
4. Create an issue in the GitHub repository

## Acknowledgments

- OpenAI for providing the GPT API
- Firebase for backend infrastructure
- React team for the amazing framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Note**: This application is designed for educational and supportive purposes. It is not a replacement for professional mental health services. If you're experiencing a mental health crisis, please contact a mental health professional or crisis hotline immediately.