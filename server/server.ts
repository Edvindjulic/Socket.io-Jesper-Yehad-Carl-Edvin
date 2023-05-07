import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./communication";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();
const allMessages: { [room: string]: { username: string; message: string }[] } =
  {};

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

  socket.on("message", (room: string, message: string) => {
    io.to(room).emit("message", socket.username, message);
    console.log(room, socket.username, message);
    if (!allMessages[room]) {
      allMessages[room] = [];
    }
    allMessages[room].push({ username: socket.username, message });
    console.log(allMessages);
  });

  socket.on("join", (room: string, ack?: () => void) => {
    console.log("Received join event from client");
    console.log("Ack function:", ack);

    socket.join(room);
    console.log(socket.rooms);
    if (ack) {
      console.log("Acknowledging client");

      ack();
    }
    // When a user joins a room, send an updated list of rooms to everyone
    io.emit("rooms", getRooms());
    console.log(getRooms());
  });

  socket.on("leave", (room: string) => {
    socket.leave(room);
    io.emit("rooms", getRooms());
  });

  // When a new user joins, send them the list of rooms
  socket.emit("rooms", getRooms());

  socket.on("disconnect", () => {
    console.log(`${username} has disconnected from the server`);

    // When a user disconnects from a room, send an updated list of rooms to everyone
    io.emit("rooms", getRooms());
    console.log(getRooms());
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

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  for (const [name, setOfSocketIds] of rooms) {
    // An actual real room that we created
    if (!setOfSocketIds.has(name)) {
      roomsFound.push(name);
    }
  }
  return roomsFound;
}

io.listen(3000);
console;
