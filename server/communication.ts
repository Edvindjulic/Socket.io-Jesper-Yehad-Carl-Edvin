export interface ServerToClientEvents {
  message: (message: string) => void;
}

export interface ClientToServerEvents {
  message(message: string): void;
  join?: (room: string) => void;
  leave?: (room: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

// wrong, fix this
export type ServerClientToServerEvents = {
  message: (message: string) => void;
};

export type ServerServerToClientEvents = {
  history: (messages: string[]) => void;
  message: (message: string) => void;
};
