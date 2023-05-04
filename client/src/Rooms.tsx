import { useEffect } from "react";
import { useRoom } from "./context/RoomContext";
import { useSocket } from "./context/SocketContext";

function Rooms() {
  const { rooms, setRooms, currentRoom, setCurrentRoom } = useRoom();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleAllRooms = (allRooms: string[]) => {
      updateRooms(allRooms);
    };

    socket.on("allRooms", handleAllRooms);

    return () => {
      socket.off("allRooms", handleAllRooms);
    };
  }, [socket]);

  const updateRooms = (allRooms: string[]) => {
    setRooms(allRooms);
  };

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomName = e.currentTarget.message.value;

    if (roomName) {
      if (!rooms.includes(roomName)) {
        // Create the room if it doesn't exist
        socket.emit("create-room", roomName);
      } else {
        // Join the room if it exists
        socket.emit("join-room", roomName);
      }
      setCurrentRoom(roomName);
    }
    e.currentTarget.message.value = "";
  };

  return (
    <div>
      <h1>Rooms</h1>
      <h3>Current room is {currentRoom}</h3>

      <form onSubmit={handleJoinRoom}>
        <label>Skriv vilket rum du vill vara i</label> <br />
        <input type="text" name="message" />
        <button type="submit">Join Room</button>
      </form>
      <h4>Detta är de rum som finns:</h4>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
