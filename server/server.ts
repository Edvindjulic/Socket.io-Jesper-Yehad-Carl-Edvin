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
const usersInRooms: { [room: string]: string[] } = {};

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
    io.emit("allMessages", allMessages); // Add this line
    console.log(allMessages);
  });

  socket.on("join", (room: string, ack?: () => void) => {
    console.log("Received join event from client");
    console.log("Ack function:", ack);

    socket.join(room);
    console.log(socket.rooms);

    // Store the username in the room
    if (!usersInRooms[room]) {
      usersInRooms[room] = [];
    }
    usersInRooms[room].push(username);

    if (ack) {
      console.log("Acknowledging client");
      ack();
    }

    // When a user joins a room, send an updated list of rooms and users to everyone
    io.emit("rooms", getRooms());
    io.emit("usersInRooms", usersInRooms);

    console.log(getRooms());
    socket.emit("allMessages", { [room]: allMessages[room] });
  });

  // When a new user joins, send them the list of rooms
  socket.emit("rooms", getRooms());

  socket.on("disconnect", () => {
    console.log(`${username} has disconnected from the server`);

    // Remove the username from the room
    const room = Object.keys(socket.rooms)[1];
    if (usersInRooms[room]) {
      const index = usersInRooms[room].indexOf(username);
      if (index !== -1) {
        usersInRooms[room].splice(index, 1);
      }
    }

    io.emit("rooms", getRooms());
    io.emit("usersInRooms", usersInRooms);

    console.log(getRooms());
  });

  socket.on("leave", (room: string) => {
    socket.leave(room);
    io.emit("rooms", getRooms());
    console.log(`${username} has left the room ${room}`);
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
