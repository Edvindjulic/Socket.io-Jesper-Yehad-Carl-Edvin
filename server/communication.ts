export interface ServerToClientEvents {
  message: (name: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  allMessages: (allMessages: { [room: string]: Message[] }) => void;
  typing: (username: string, isTyping: boolean) => void;
  session: (session: SocketData) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  history: (messages: string[]) => void;
  join: (room: string, ack: () => void) => void;
  leave: (room: string) => void;
  userLeft: (username: string) => void;
  allRooms: (rooms: string[]) => void;
  typing: (room: string, isTyping: boolean) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username: string;
  userID: string;
  sessionID: string;
  room: string;
}

export interface Message {
  username: string;
  message: string;
}
