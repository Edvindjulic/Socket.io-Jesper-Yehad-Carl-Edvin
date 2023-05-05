import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./communication";

const io = new Server<ServerToClientEvents, ClientToServerEvents>();

const allMessages: string[] = [];
const allRooms: string[] = ["Room 1", "Room 2", "Room 3"];

// Middleware
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (typeof username === "string") {
    // Next -> Error om username inte är en string
    (socket as any).username = username;
    next(); // Next -> Skickar vidare till  "connection"
  } else {
    next(new Error("invalid username"));
  }
});

io.on("connection", (socket: any) => {
  const username = socket.username;

  console.log(`${username} has connected to the server`);
  socket.emit("history", allMessages);

  socket.emit("allRooms", allRooms);

  socket.on("message", (message: string) => {
    const fullMessage = `${username}: ${message}`;
    allMessages.push(fullMessage);
    io.emit("message", fullMessage);
  });

  socket.on("create-room", (roomName: string) => {
    console.log(`User ${username} created room ${roomName}`);

    if (!allRooms.includes(roomName)) {
      allRooms.push(roomName);
      io.emit("allRooms", allRooms);
    }
  });

  socket.on("join-room", (roomName: string) => {
    console.log(`User ${username} joined room ${roomName}`);
    console.log(allRooms);
  });
  socket.on("disconnect", () => {
    console.log(`${username} has disconnected from the server`);
    io.emit("leave", `${username} has disconnected from the server`);
  });

  socket.on("leave", (room: string) => {
    console.log(`${username} has left the room ${room}`);
    io.to(room).emit("userLeft", `${username} has left the room ${room}`);
  });
});

io.listen(3000);
console.log("listening on port 3000");
