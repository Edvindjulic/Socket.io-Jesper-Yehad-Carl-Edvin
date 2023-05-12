import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  PrivateMessage,
  ServerToClientEvents,
  SocketData,
  User,
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
const allPrivateMessages: PrivateMessage[] = [];

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
  socket.data.room = "Default";
  sessionStore.saveSession(socket.data.sessionID, socket.data as SocketData);
  next();
});

io.on("connection", (socket) => {
  //Exemplet från socket.io med lite ändringar för att passa vår kod
  const users: SocketData[] = [];
  socket.emit("users", users);
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: socket.data.userID!,
      username: socket.data.username!,
      sessionID: socket.data.sessionID!,
      room: socket.data.room!,
    });
  }
  socket.emit("users", users);

  // Broadcasta users till alla befintliga users
  socket.broadcast.emit("users", users);

  // Emit exemplet från socket.io
  io.emit("userConnected", {
    username: socket.data.username!,
  });

  const username = socket.data.username;
  socket.emit("session", socket.data as SocketData);

  console.log(`${username} has connected to the server`);
  /* console.log(socket.data);
  console.log(sessionStore.findAllSessions()); */
  if (socket.data.room && socket.data.room !== "Default") {
    socket.join(socket.data.room);
    console.log("I rejoin the", socket.data.room);
  }
  io.emit("rooms", getRooms());
  io.emit("allMessages", allMessages); // Add this line

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

  socket.on("pm", ({ msg, to }) => {
    const privateMessage: PrivateMessage = {
      msg,
      from: socket.data.userID,
      to,
    };
    socket.to(to!).to(socket.data.userID!).emit("pm", privateMessage);
    allPrivateMessages.push(privateMessage);
  });

  socket.on("join", (room: string, ack?: () => void) => {
    console.log("Received   join event from client");
    console.log("Ack function:", ack);

    console.log("Before", socket.data.room);
    socket.data.room = room;
    sessionStore.saveSession(socket.data.sessionID!, socket.data as SocketData); // Add this line

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
    const users: SocketData[] = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: socket.data.userID!,
        username: socket.data.username!,
        sessionID: socket.data.sessionID!,
        room: socket.data.room!,
      });
    }

    io.emit("users", users);
  });

  // When a new user joins, send them the list of rooms
  socket.emit("rooms", getRooms());

  socket.on("disconnect", () => {
    console.log(`${username} has disconnected from the server`);

    const users: SocketData[] = [];
    io.emit("users", users);
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: socket.data.userID!,
        username: socket.data.username!,
        sessionID: socket.data.sessionID!,
        room: socket.data.room!,
      });
    }

    io.emit("users", users);
    io.emit("rooms", getRooms());
    console.log(getRooms());
  });

  socket.on("leave", (room: string) => {
    socket.data.room = "Default";
    sessionStore.saveSession(socket.data.sessionID!, socket.data as SocketData);
    socket.leave(room);
    io.emit("rooms", getRooms());
    console.log(`${username} has left the room ${room}`);

    const users: SocketData[] = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: socket.data.userID!,
        username: socket.data.username!,
        sessionID: socket.data.sessionID!,
        room: socket.data.room!,
      });
    }

    io.emit("users", users);
  });

  socket.on("typing", (room: string, isTyping: boolean) => {
    socket.broadcast.to(room).emit("typing", socket.data.username!, isTyping);
    console.log(`${socket.data.username} is typing`);
  });
});

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = []; // Room[]

  for (const [name, setOfSocketIds] of rooms) {
    if (!setOfSocketIds.has(name)) {
      if (name.startsWith("DM")) continue;
      roomsFound.push(name);
    }
  }
  return roomsFound;
}

interface Room {
  name: string;
  users: User[];
}

io.listen(3000);
console;
