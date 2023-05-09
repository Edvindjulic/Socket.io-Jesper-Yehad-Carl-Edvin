import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./communication";
import SessionStore from "./sessionStore";

const sessionStore = new SessionStore();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();
const allMessages: { [room: string]: { username: string; message: string }[] } =
  {};

// Exempel från socket.io
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.data.sessionID = sessionID;
      socket.data.userID = session.userID;
      socket.data.username = session.username;
      socket.data.room = session.room;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // create new session
  socket.data.sessionID = Date.now().toString();
  socket.data.userID = Date.now().toString();
  socket.data.username = username;
  socket.data.room = "default";
  sessionStore.saveSession(socket.data.sessionID, socket.data as SocketData);
  next();
});

io.on("connection", (socket) => {
  const username = socket.data.username;
  socket.emit("session", socket.data as SocketData);

  console.log(`${username} has connected to the server`);
  /* console.log(socket.data);
  console.log(sessionStore.findAllSessions()); */
  if (socket.data.room && socket.data.room !== "default") {
    socket.join(socket.data.room);
    console.log("I rejoin the", socket.data.room);
  }

  socket.on("message", (room: string, message: string) => {
    io.to(room).emit("message", socket.data.username!, message);
    console.log(room, socket.data.username, message);
    if (!allMessages[room]) {
      allMessages[room] = [];
    }
    allMessages[room].push({ username: socket.data.username!, message });
    io.emit("allMessages", allMessages); // Add this line
    console.log(allMessages);
  });

  socket.on("join", (room: string, ack?: () => void) => {
    console.log("Received   join event from client");
    console.log("Ack function:", ack);

    console.log("Before", socket.data.room);
    socket.data.room = room;
    socket.join(room);
    console.log("Socket data after set", socket.data.room);
    console.log(socket.rooms);
    if (ack) {
      console.log("Acknowledging client");

      ack();
    }
    // When a user joins a room, send an updated list of rooms to everyone
    io.emit("rooms", getRooms());
    console.log(getRooms());
    socket.emit("allMessages", { [room]: allMessages[room] });
  });

  // When a new user joins, send them the list of rooms
  socket.emit("rooms", getRooms());

  socket.on("disconnect", () => {
    console.log(`${username} has disconnected from the server`);
    // io.emit("leave", `${username} has disconnected from the server`);
    io.emit("rooms", getRooms());
    console.log(getRooms());
  });

  socket.on("leave", (room: string) => {
    socket.leave(room);
    io.emit("rooms", getRooms());
    console.log(`${username} has left the room ${room}`);
    // io.to(room).emit("userLeft", `${username} has left the room ${room}`);
  });

  socket.on("typing", (room: string, isTyping: boolean) => {
    socket.broadcast.to(room).emit("typing", socket.data.username!, isTyping);
    console.log(`${socket.data.username} is typing`);
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
