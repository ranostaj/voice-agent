import { ReactNode, useMemo } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import WebSocketContext, { WebSocketContextType } from './WebSocketContex';

interface WebSocketProviderProps {
  url?: string;
  children: ReactNode;
  options?: Record<string, string>;
}

// WebSocket Provider Component
export const WebSocketProvider = ({ url, children, options = {} }: WebSocketProviderProps) => {
  // Default WebSocket URL if not provided
  const socketUrl = url || 'ws://localhost:8080';
  
  // Using the react-use-websocket hook
  const {
    sendMessage,
    lastMessage,
    readyState,
    getWebSocket,
    lastJsonMessage
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: () => true,
    ...options
  });

  // Value to be provided by the context, wrapped in useMemo to prevent unnecessary rerenders
  const value = useMemo<WebSocketContextType>(() => ({
    sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket: () => getWebSocket() as WebSocket | null,
    isConnecting: readyState === ReadyState.CONNECTING,
    isOpen: readyState === ReadyState.OPEN,
    isClosing: readyState === ReadyState.CLOSING,
    isClosed: readyState === ReadyState.CLOSED
  }), [sendMessage, lastMessage, lastJsonMessage, readyState, getWebSocket]);

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
