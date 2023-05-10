import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface UsersInRoomProps {
  room: string;
  username: string; // Add the 'username' prop
}

const UsersInRoom: React.FC<UsersInRoomProps> = ({
  room,
  username, // Add the 'username' prop here
}: UsersInRoomProps) => {
  const [users, setUsers] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      const handleUsersInRooms = (usersInRooms: {
        [room: string]: string[];
      }) => {
        const usersInCurrentRoom = usersInRooms[room] || [];
        setUsers((prevUsers) => {
          const newUsers = usersInCurrentRoom.filter(
            (user) => !prevUsers.includes(user)
          );
          return [...prevUsers, ...newUsers];
        });
      };
      socket.on("usersInRooms", handleUsersInRooms);

      return () => {
        socket.off("usersInRooms", handleUsersInRooms);
      };
    }
  }, [room, socket]);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
