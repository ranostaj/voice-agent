# Voice Agent

A real-time voice communication application built with React and TypeScript that enables voice recording, playback, and real-time audio streaming through WebSocket connections.

## Application Summary

Voice Agent is a modern web application that provides a voice interaction interface. Users can record audio messages, send them to a WebSocket server, and receive audio responses in real-time. The application features a clean, responsive UI with modal-based voice interaction and comprehensive audio management capabilities.

## Architecture

The application follows a component-based architecture with React functional components and context-based state management:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS 4.x with container queries
- **Real-time Communication**: WebSocket for bidirectional audio streaming
- **State Management**: React Context API for global state and WebSocket management

### Key Architectural Patterns

- **Context Providers**: Centralized state management for WebSocket connections and app state
- **Custom Hooks**: Abstraction layer for complex logic (audio recording, WebSocket communication, timers)
- **Component Composition**: Modular UI components with clear separation of concerns
 

## Libraries Used

### Core Dependencies
- **react**  
- **react-dom**   
- **typescript**  

### UI & Styling
- **tailwindcss**  
- **clsx**  

### Audio & WebSocket
- **react-use-websocket**  
- **react-audio-voice-recorder** 
- **wavesurfer.js** 


## File Structure

```
voice-agent/
├── src/
│   ├── components/             # React components
│   │   ├── VoiceAgent.tsx      # Main voice interaction component
│   │   ├── VoicePlayer.tsx     # Audio playback component
│   │   ├── VoiceRecorder.tsx   # Audio recording component
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Header.tsx
│   │       ├── MediaIcons.tsx
│   │       ├── Modal.tsx
│   │       ├── Timer.tsx
│   │       ├── Wave.tsx
│   │       └── index.ts
│   ├── context/                # React Context providers
│   │   ├── WebSocketContext.ts
│   │   └── WebSocketContextProvider.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAudioPlayer.ts
│   │   ├── useAudioRecorder.ts
│   │   ├── useTimer.ts
│   │   ├── useWebSocketContext.ts
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   └── timeFormatter.ts
```

## WebSocket State Management

The application uses a WebSocket state management system built around React Context:

### WebSocketProvider
- **Location**: `src/context/WebSocketContextProvider.tsx`
- **Purpose**: Manages WebSocket connection lifecycle and provides connection state to components
- **Features**:
  - Automatic reconnection on connection loss
  - Connection state tracking (connecting, open, closing, closed)
  - Message sending and receiving
  - Error handling and logging
 
### Usage in Components:
The `VoiceAgent` component demonstrates WebSocket integration:
- Sends recorded audio blobs to the WebSocket server
- Receives audio responses and converts them to playable format
- Maintains conversation history with sent and received audio
 
## How to Start the App

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- A WebSocket server running on `ws://localhost:8080` (for full functionality)
 

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Features Implemented


- **Real-time Audio Recording**: High-quality voice recording using `react-audio-voice-recorder`
- **Audio Playback**: Smooth audio playback with waveform visualization using `wavesurfer.js`
- **Recording Controls**: Start, stop, pause, and delete recording functionality
- **Audio Validation**: Ensures only valid audio data is processed and sent


- **WebSocket Integration**: Bidirectional real-time communication with WebSocket server
- **Binary Audio Streaming**: Efficient transmission of audio data as binary blobs
- **Connection State Management**: Real-time connection status tracking and automatic reconnection

- **Audio History**: Track and display sent and received audio messages
- **Audio Persistence**: Maintain conversation state during the session
- **Message Metadata**: Track message origin (user vs agent)



## Features That Could Be Implemented

- **Voice Activity Detection**: Automatically start/stop recording based on voice detection
- **Noise Cancellation**: Background noise reduction for clearer audio
- **Voice Commands**: Voice-activated controls for hands-free operation
- **Conversation Persistence**: Save conversations to local storage or database
- **Search Conversations**: Full-text search through conversation history
- **User Authentication**: Login system with user accounts
- **Data Privacy Controls**: User consent and data deletion options
- **Audit Logging**: Track system usage and security events
- **Keyboard Shortcuts**: Hotkeys for common actions
 