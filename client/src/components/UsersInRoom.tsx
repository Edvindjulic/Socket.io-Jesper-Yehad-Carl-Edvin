import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface UsersInRoomProps {
  room: string;
}

const UsersInRoom: React.FC<UsersInRoomProps> = ({ room }) => {
  const [users, setUsers] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // Handle the 'usersInRooms' event to update the list of users
      const handleUsersInRooms = (usersInRooms: {
        [room: string]: string[];
      }) => {
        const usersInCurrentRoom = usersInRooms[room] || [];
        setUsers(usersInCurrentRoom);
      };
      socket.on("usersInRooms", handleUsersInRooms);

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("usersInRooms", handleUsersInRooms);
      };
    }
  }, [room, socket]);

  return (
    <div>
      <h3>Room: {room}</h3>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
