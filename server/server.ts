import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./communication";

const io = new Server<ServerToClientEvents, ClientToServerEvents>();

const allMessages: string[] = [];

// Middleware
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (typeof username === "string") {    // Next -> Error om username inte är en string
    (socket as any).username = username;
    next();                               // Next -> Skickar vidare till  "connection"
  } else {
    next(new Error("invalid username")); 
  }
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  const username = socket.username; // username som checkades i io.use

  socket.emit("history", allMessages);

  socket.on("message", (message: string) => {
    const fullMessage = `${username}: ${message}`; // username + meddelande
    allMessages.push(fullMessage);
    io.emit("message", fullMessage);
  });
});


io.listen(3000);
console.log("listening on port 3000");
