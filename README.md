# AI Chat App

A mini AiChat mobile application built with React Native.

## Features

- **Chat Interface**: Send messages and receive AI responses in a modern chat bubble style
- **Theme Support**: Toggle between light and dark themes
- **Local Storage**: Chat history persists using AsyncStorage
- **Settings Screen**: Configure API keys and manage app preferences
- **Navigation**: React Navigation for seamless screen transitions
- **Error Handling**: Graceful fallback when AI service is unavailable

## Prerequisites

- Node.js (version 18 or higher)
- React Native CLI
- Android Studio (For Android development)
- Xcode (For Ios Development)
- An OpenAI API key (optional, for real AI responses)

## Installation

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd AiChatApp
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```
   cd ios && pod install && cd ..
   ```

## Configuration

### API Key Setup (Optional)

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open the app and navigate to Settings
3. Enter your API key and tap "Save API Key"
4. The app will now use AI responses from your backend

**Note**: Without an API key, the app will use fallback responses for demonstration purposes.

## Running the App

### Android

```
npm run android
```

### iOS (macOS only)

```
npm run ios
```

### Metro Bundler

```
npm start
```

## Project Structure

```
src/
├── context/
│   └── ThemeContext.js          # Theme management and colors
├── navigation/
│   └── AppNavigator.js          # Navigation configuration
├── screens/
│   ├── ChatScreen.js            # Main chat interface
│   └── SettingsScreen.js        # Settings and configuration
└── services/
    └── aiService.js             # AI API integration
```

## Key Components

### ThemeContext
- Manages light/dark theme state

### ChatScreen
- Main chat interface with message bubbles
- Handles message sending and receiving
- Integrates with AI service for responses
- Auto-scrolls to latest messages
- Shows typing indicators

### SettingsScreen
- API key configuration
- Theme toggle
- Chat history management
- Data persistence controls

### AIService
- Handles backend API communication via proxy
- API key authentication in headers
- Provides fallback responses
- Error handling and user feedback
- Conversation context management

## Dependencies

- **@react-navigation/native**: Navigation framework
- **@react-navigation/stack**: Stack navigation
- **@react-native-async-storage/async-storage**: Local data persistence
- **react-native-safe-area-context**: Safe area handling
- **react-native-screens**: Native screen components
- **react-native-gesture-handler**: Touch handling

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```
   npx react-native start --reset-cache
   ```

2. **Android build errors**
   - Clean and rebuild: `cd android && ./gradlew clean && cd ..`
   - Check Android SDK and build tools versions

3. **iOS build errors**
   - Clean build folder in Xcode
   - Update CocoaPods: `cd ios && pod update && cd ..`
