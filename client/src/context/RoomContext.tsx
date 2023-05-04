import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ContextValues {
  rooms: string[];
  setRooms: (rooms: string[]) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

export const RoomContext = createContext<ContextValues>(null as any);
export const useRoom = () => useContext(RoomContext);

function SocketProvier({ children }: PropsWithChildren) {
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("start room");

  return (
    <RoomContext.Provider
      value={{ rooms, setRooms, currentRoom, setCurrentRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export default SocketProvier;
