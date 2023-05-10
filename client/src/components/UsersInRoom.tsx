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
      socket.on("usersInRoom", (roomUsers: string[]) => {
        setUsers(roomUsers);
      });

      return () => {
        socket.off("usersInRoom");
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
