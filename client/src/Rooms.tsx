import { useRoom } from "./context/RoomContext";

function Rooms() {
  const { rooms, setRooms, currentRoom, setCurrentRoom } = useRoom();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const roomChoice = textInput.value;
    setRooms([...rooms, roomChoice]);
    setCurrentRoom(roomChoice);

    textInput.value = "";
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
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
