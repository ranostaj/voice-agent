import { createContext } from "react";
import { SendMessage } from "react-use-websocket/dist/lib/types";

// Define the WebSocket context type
export interface WebSocketContextType {
  sendMessage: SendMessage;
  lastMessage: MessageEvent<any> | null;
  lastJsonMessage: any;
  readyState: number;
  getWebSocket: () => WebSocket | null;
  isConnecting?: boolean;
  isOpen?: boolean;
  isClosing?: boolean;
  isClosed?: boolean;
}

// WebSocket Context with type
const WebSocketContext = createContext<WebSocketContextType | null>(null);

export default WebSocketContext;
