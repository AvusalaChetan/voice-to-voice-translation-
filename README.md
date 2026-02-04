# Voice-to-Voice Translation App

Real-time voice translation application using Web Speech API and AI translation services.

## Features

- 🎤 **Continuous voice recording** - Speak for unlimited duration
- 🌐 **Multi-language support** - Translate between multiple languages
- ⚡ **Real-time translation** - Instant translation via WebSocket
- 🔄 **Auto-restart** - Overcomes browser speech recognition timeouts
- 💡 **Smart error handling** - Graceful fallbacks and error recovery

## Tech Stack

### Client

- React 19 + TypeScript
- Vite
- Tailwind CSS 
- Socket.IO Client
- Web Speech API

### Server

- Node.js + Express
- TypeScript
- Socket.IO
- Lingo.dev SDK for translation

## Setup

### Prerequisites

- Node.js 18+
- Lingo.dev API key

### Installation

1. **Clone and install dependencies:**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

2. **Configure environment variables:**

   ```bash
   # Server configuration
   cd server
   cp .env.example .env
   # Edit .env and add your LINGODOTDEV_API_KEY
   ```

3. **Run the application:**

   **Terminal 1 - Server:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Client:**

   ```bash
   cd client
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:5173`

## Usage

1. Select source language (language you'll speak)
2. Select target language (language you want to translate to)
3. Click the microphone button to start recording
4. Speak continuously - the app will keep listening
5. Click the microphone again to stop
6. View translated text in real-time

## How It Works

### Continuous Listening Solution

The Web Speech API has a built-in timeout (~4-5 seconds of silence). This app overcomes it by:

1. **Auto-restart mechanism**: Detects when recognition ends unexpectedly and automatically restarts it
2. **State tracking**: Uses refs to track if user wants to keep listening vs. browser timeout
3. **Interim results**: Processes speech in real-time chunks for better responsiveness
4. **Error handling**: Gracefully handles `no-speech` and `aborted` errors

### Architecture

```
Client                  Server
  │                       │
  ├─ Speech Recognition   │
  │  (Web Speech API)     │
  │                       │
  ├─ Socket.IO Client ────┼──> Socket.IO Server
  │  (emit: TEXT)         │    (on: TEXT)
  │                       │
  │  (on: TRANSCRIPT) <───┼──  Lingo.dev Translation
  │                       │
  └─ UI Display          └──> Response
```

## Known Issues & Limitations

- **Browser compatibility**: Web Speech API works best in Chrome/Edge
- **Microphone permissions**: Browser will request microphone access
- **Network dependency**: Requires active internet for translation API
- **Language support**: Limited by Web Speech API and translation service

## Troubleshooting

**Recognition stops after 4 seconds:**

- Fixed by auto-restart mechanism - should now work continuously

**"Microphone not detected" error:**

- Grant microphone permissions in browser
- Check if microphone is connected and working

**Translation not working:**

- Verify `LINGODOTDEV_API_KEY` is set correctly
- Check server console for errors
- Ensure Socket.IO connection is established

## License

MIT

## Credits

Built with ❤️ using modern web technologies