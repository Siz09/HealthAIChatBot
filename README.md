# MindEase - Student Mental Health Chatbot

A supportive AI-powered mental health chatbot designed specifically for students, featuring mood tracking, chat support, and a beautiful, responsive interface built with React frontend and Spring Boot backend.

## Features

- 🤖 **AI-Powered Chat Support**: Empathetic conversations powered by OpenAI's GPT-4
- 📊 **Mood Tracking**: Log and track your daily mood with notes and history
- 🌙 **Dark/Light Mode**: Comfortable viewing in any lighting condition
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 💾 **Persistent Storage**: Chat history and mood logs saved securely in MySQL database
- 🔐 **Anonymous Sessions**: No personal data required, uses anonymous session management

## Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with modern design principles

### Backend
- **Spring Boot** - Java-based REST API server
- **MySQL** - Relational database for data persistence
- **JPA/Hibernate** - Object-relational mapping
- **OpenAI API** - AI chat responses

### Deployment
- **Frontend**: Can be deployed to Netlify, Vercel, or any static hosting
- **Backend**: Can be deployed to Heroku, AWS, or any Java hosting platform

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Java 17** or higher
- **Maven** (for building the Spring Boot application)
- **MySQL** (version 8.0 or higher)
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd student-mental-health-chatbot
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE mindease_db;
```

### 3. Backend Setup

Navigate to the Spring Boot backend directory and set up environment variables:

```bash
cd backend-springboot
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_key_here
```

Build and run the Spring Boot application:

```bash
# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will run on `http://localhost:8080`

### 4. Frontend Setup

In a new terminal, navigate back to the root directory and install frontend dependencies:

```bash
cd ..
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Running the Application

### Development Mode

You need to run both the Spring Boot backend and React frontend:

#### Terminal 1 - Start Spring Boot Backend
```bash
cd backend-springboot
mvn spring-boot:run
```
The backend will run on `http://localhost:8080`

#### Terminal 2 - Start React Frontend
```bash
cd ..
npm start
```
The frontend will run on `http://localhost:3000`

### Production Build

```bash
# Build the Spring Boot backend
cd backend-springboot
mvn clean package

# Build the frontend for production
cd ..
npm run build
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
│   ├── App.js                 # Main App component
│   └── index.js              # React entry point
├── backend-springboot/        # Spring Boot backend
│   ├── src/main/java/com/mindease/
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # Data repositories
│   │   ├── service/          # Business logic
│   │   ├── controller/       # REST controllers
│   │   ├── dto/              # Data transfer objects
│   │   └── config/           # Configuration classes
│   ├── src/main/resources/
│   │   └── application.yml   # Spring Boot configuration
│   └── pom.xml              # Maven dependencies
└── package.json             # Frontend dependencies
```

## API Endpoints

### Chat API
- **POST** `/api/chat`
  - Body: `{ "message": "user message", "anonymousId": "user_id" }`
  - Response: `{ "reply": "AI response", "messageId": "message_id" }`

- **GET** `/api/chat/history/{anonymousId}`
  - Response: Array of chat message objects

### Mood Tracking API
- **POST** `/api/mood`
  - Body: `{ "anonymousId": "string", "mood": "string", "moodEmoji": "string", "moodLabel": "string", "note": "string" }`
  - Response: Mood log object with ID and timestamp

- **GET** `/api/mood/history/{anonymousId}`
  - Response: Array of mood log objects

## Features Guide

### Chat Interface
- Type messages in the input field at the bottom
- Press Enter or click the send button to send messages
- The AI responds with supportive, empathetic messages
- Chat history is saved to the database and persists across sessions

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

#### 1. Connection refused to localhost:8080
**Problem**: The Spring Boot backend server isn't running
**Solution**: Make sure to start the Spring Boot server first:
```bash
cd backend-springboot
mvn spring-boot:run
```

#### 2. Database connection error
**Problem**: MySQL database is not running or credentials are incorrect
**Solution**: 
- Make sure MySQL is running on your system
- Check the database credentials in `backend-springboot/.env`
- Ensure the database `mindease_db` exists

#### 3. OpenAI API Key Error
**Problem**: Missing or invalid OpenAI API key
**Solution**: 
- Check that `OPENAI_API_KEY` is set in `backend-springboot/.env`
- Verify your API key is valid and has sufficient credits
- Ensure there are no extra spaces or quotes around the key

#### 4. Maven Build Errors
**Problem**: Spring Boot application fails to build
**Solution**:
- Ensure Java 17 or higher is installed
- Check that Maven is properly installed
- Run `mvn clean install` to rebuild dependencies

#### 5. Frontend Build Errors
**Problem**: npm run build fails
**Solution**:
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for any TypeScript or linting errors
- Ensure all dependencies are compatible

### Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Code Splitting**: The app already uses React's lazy loading
3. **Database Indexing**: Add indexes to frequently queried columns in MySQL
4. **Bundle Analysis**: Run `npm run build` and check the bundle size

## Deployment

### Frontend Deployment

#### Netlify (Recommended)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set up environment variables if needed

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app
3. Set build command to `npm run build`

### Backend Deployment

#### Heroku
1. Create a Heroku app
2. Add MySQL addon (JawsDB or ClearDB)
3. Set environment variables in Heroku dashboard
4. Deploy the Spring Boot application

#### AWS/DigitalOcean
1. Set up a server with Java 17+
2. Install MySQL
3. Build the application: `mvn clean package`
4. Run the JAR file: `java -jar target/mental-health-chatbot-0.0.1-SNAPSHOT.jar`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Security Considerations

- API keys are stored securely in environment variables
- Database access is controlled through JPA repositories
- Anonymous session management protects user privacy
- CORS is properly configured for cross-origin requests
- All data is encrypted in transit and at rest

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the [Spring Boot documentation](https://spring.io/projects/spring-boot)
3. Check [OpenAI API documentation](https://platform.openai.com/docs)
4. Review [MySQL documentation](https://dev.mysql.com/doc/)
5. Create an issue in the GitHub repository

## Acknowledgments

- OpenAI for providing the GPT API
- Spring Boot team for the excellent framework
- MySQL for reliable database management
- React team for the amazing framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Note**: This application is designed for educational and supportive purposes. It is not a replacement for professional mental health services. If you're experiencing a mental health crisis, please contact a mental health professional or crisis hotline immediately.