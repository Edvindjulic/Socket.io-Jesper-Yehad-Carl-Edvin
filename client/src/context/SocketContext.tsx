import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import type {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "../../../server/communication.ts";

interface ContextValues {
  joinRoom: (room: string) => void;
  sendMessage: (message: string) => void;
  currentRoom?: string;
  messages: Message[];
  socket: Socket;
  listOfRooms: string[];
}

const SocketContext = createContext<ContextValues>(null as any);

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io()
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("Default");
  const [listOfRooms, setListOfRooms] = useState<string[]>([]);

  const joinRoom = (room: string) => {
    socket.emit("join", room, () => {
      setCurrentRoom(room);
    });
  };

  const sendMessage = (message: string) => {
    if (!currentRoom) throw Error("Not in a room");
    socket.emit("message", currentRoom, message);
  };

  useEffect(() => {
    function connect() {
      console.log("Connected to server");
    }
    function disconnect() {
      console.log("Disconnected from server");
    }
    function message(name: string, message: string) {
      setMessages((messages) => [...messages, { name, message }]);
    }
    function rooms(rooms: string[]) {
      console.log(rooms);
      setListOfRooms(rooms);
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("message", message);
      socket.off("rooms", rooms);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        joinRoom,
        socket,
        messages,
        sendMessage,
        currentRoom,
        listOfRooms,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
