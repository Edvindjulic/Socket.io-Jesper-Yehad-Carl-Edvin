import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface UsersInRoomProps {
  room: string;
  username: string;
}

const UsersInRoom: React.FC<UsersInRoomProps> = ({
  room,
  username,
}: UsersInRoomProps) => {
  const [users, setUsers] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    const handleUsersInRooms = (usersInRooms: { [room: string]: string[] }) => {
      const usersInCurrentRoom = usersInRooms[room] || [];
      setUsers((prevUsers) => {
        const newUsers = usersInCurrentRoom.filter(
          (user) => !prevUsers.includes(user)
        );
        return [...prevUsers, ...newUsers];
      });
    };

    if (socket) {
      socket.on("usersInRooms", handleUsersInRooms);
    }

    return () => {
      if (socket) {
        socket.off("usersInRooms", handleUsersInRooms);
      }
    };
  }, [room, socket]);

  return (
    <Box>
      <Typography variant="h6">Users in Room: {room}</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user}>{user}</ListItem>
        ))}
      </List>
      <Typography variant="body1">Your Username: {username}</Typography>
    </Box>
  );
};

export default UsersInRoom;
