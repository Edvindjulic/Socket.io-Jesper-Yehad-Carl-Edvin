import { Server } from "socket.io";
import type {
  ServerClientToServerEvents,
  ServerServerToClientEvents,
} from "./communication";

const io = new Server<ServerClientToServerEvents, ServerServerToClientEvents>();

const allMessages: string[] = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("history", allMessages);

  socket.on("message", (message) => {
    allMessages.push(message);
    io.emit("message", message);
  });
});

io.listen(3000);
console.log("listening on port 3000");
