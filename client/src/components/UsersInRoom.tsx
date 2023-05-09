import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface UsersInRoomProps {
  room: string;
}

const UsersInRoom: React.FC<UsersInRoomProps> = ({ room }) => {
  const [users, setUsers] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      const handleUsersInRooms = (usersInRooms: {
        [room: string]: string[];
      }) => {
        const usersInCurrentRoom = usersInRooms[room] || [];
        setUsers((prevUsers) => {
          // Filter out users that are already in the list
          const newUsers = usersInCurrentRoom.filter(
            (user) => !prevUsers.includes(user)
          );
          // Concatenate the new users with the existing list
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
