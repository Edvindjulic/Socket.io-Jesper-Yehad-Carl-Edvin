import { useEffect } from "react";
import { useRoom } from "./context/RoomContext";
import { useSocket } from "./context/SocketContext";

function Rooms() {
  const { rooms, setRooms, currentRoom, setCurrentRoom } = useRoom();
  const { socket } = useSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const roomChoice = textInput.value;
    socket.emit("create-room", roomChoice); // emit a 'create-room' event to the server with the new room name
    textInput.value = "";
  };

  useEffect(() => {
    // set up an event listener to receive the list of rooms from the server
    socket.on("allRooms", (allRooms: string[]) => {
      setRooms(allRooms);
    });

    // clean up the event listener when the component unmounts
    return () => {
      socket.off("allRooms");
    };
  }, [socket]);

  const handleJoinRoom = (roomName: string) => {
    socket.emit("join-room", roomName); // Emit a 'join-room' event to the server with the room name
    setCurrentRoom(roomName); // Set the current room in the component state
  };

  return (
    <div>
      <h1>Rooms</h1>
      <h3>Current room is {currentRoom}</h3>

      <form onSubmit={handleSubmit}>
        <label>Skriv vilket rum du vill vara i</label> <br />
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
      <h4>Detta är de rum som finns:</h4>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <button onClick={() => handleJoinRoom(room)}>{room}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
