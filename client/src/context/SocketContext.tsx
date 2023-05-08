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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket;
  listOfRooms: string[];
  allMessageHistory: { [room: string]: Message[] };
  setAllMessageHistory: React.Dispatch<
    React.SetStateAction<{ [room: string]: Message[] }>
  >;
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
  const [allMessageHistory, setAllMessageHistory] = useState<{
    [room: string]: Message[];
  }>({});

  const joinRoom = (room: string) => {
    socket.emit("leave", currentRoom);
    socket.emit("join", room, () => {
      console.log("Received acknowledgement from server");
      setCurrentRoom(room);
    });
  };

  const sendMessage = (message: string) => {
    if (!currentRoom) throw Error("Not in a room");
    socket.emit("message", currentRoom, message);
  };
  useEffect(() => {
    console.log("Updated current room:", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    function connect() {
      console.log("Connected to server");
    }
    function disconnect() {
      console.log("Disconnected from server");
    }
    function message(username: string, message: string) {
      setMessages((messages) => [...messages, { username, message }]);
    }
    function rooms(rooms: string[]) {
      console.log(rooms);
      setListOfRooms(rooms);
    }

    function allMessages(allMessages: { [room: string]: Message[] }) {
      setAllMessageHistory(allMessages);
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);
    socket.on("allMessages", allMessages);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("message", message);
      socket.off("rooms", rooms);
      socket.off("allMessages", allMessages);
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
        setMessages,
        allMessageHistory,
        setAllMessageHistory,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
