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
  User,
} from "../../../server/communication.ts";

interface ContextValues {
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
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
  usernameAlreadySelected: boolean;
  setUsernameAlreadySelected: (value: boolean) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  createPrivateRoom: (to: string) => void;
}

const SocketContext = createContext<ContextValues>(null as any);

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io({ autoConnect: false })
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("Default");
  const [listOfRooms, setListOfRooms] = useState<string[]>([]);
  const [allMessageHistory, setAllMessageHistory] = useState<{
    [room: string]: Message[];
  }>({});
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const joinRoom = (room: string) => {
    socket.emit("leave", currentRoom);
    socket.emit("join", room, () => {
      console.log("Received acknowledgement from server");
      setCurrentRoom(room);
    });
  };

  const leaveRoom = () => {
    socket.emit("leave", currentRoom);
    setCurrentRoom("Default");
  };

  const sendMessage = (message: string) => {
    if (!currentRoom) throw Error("Not in a room");
    socket.emit("message", currentRoom, message);
  };

  const createPrivateRoom = (to: string) => {
    const from = sessionStorage.getItem("userID");
    const ids = [Number(from), Number(to)].sort((a, b) => a - b);
    const sum = "DM-" + ids.join("-");
    console.log(sum);
    socket.emit("leave", currentRoom);
    socket.emit("join", sum, () => {
      console.log("Received acknowledgement from server");
      setCurrentRoom(sum);
    });

    console.log("Creating private room", "from:", from, "to:", to);
  };

  useEffect(() => {
    console.log("Updated current room:", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    socket.on("session", ({ sessionID, room, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      sessionStorage.setItem("sessionID", sessionID);
      sessionStorage.setItem("room", room);
      sessionStorage.setItem("userID", userID);
      setCurrentRoom(room);
      console.log(room);
      // save the ID of the user
      //ocket.userID = userID;
    });
  }, [socket]);

  useEffect(() => {
    const sessionID = sessionStorage.getItem("sessionID");

    if (sessionID) {
      setUsernameAlreadySelected(true);
      socket.auth = { sessionID };
      socket.connect();
    }
  }, [socket]);

  useEffect(() => {
    function connect() {
      console.log("Connected to server");
    }
    function userConnected({ username }: { username: string }) {
      console.log(`${username} has connected to the server`);
    }
    function handleUsers(users: any[]) {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      setUsers(
        users.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        })
      );
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
    socket.on("userConnected", userConnected);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);
    socket.on("allMessages", allMessages);
    socket.on("users", handleUsers);

    return () => {
      socket.off("connect", connect);
      socket.off("userConnected", userConnected);
      socket.off("disconnect", disconnect);
      socket.off("message", message);
      socket.off("rooms", rooms);
      socket.off("allMessages", allMessages);
      socket.off("users", handleUsers);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        joinRoom,
        leaveRoom,
        socket,
        messages,
        sendMessage,
        currentRoom,
        listOfRooms,
        setMessages,
        allMessageHistory,
        setAllMessageHistory,
        usernameAlreadySelected,
        setUsernameAlreadySelected,
        users,
        setUsers,
        createPrivateRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
