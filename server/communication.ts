export interface ServerToClientEvents {
  message: (message: string) => void;
}

export interface ClientToServerEvents {
  message(message: string): void;
  history: (messages: string[]) => void;
  join?: (room: string) => void;
  leave?: (room: string) => void;
  allRooms: (rooms: string[]) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
