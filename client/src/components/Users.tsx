import { useSocket } from "../context/SocketContext";
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function Users() {
  const { users } = useSocket();
  
  return (
    <>
      <Typography variant="h6">Online Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.userID}>
            <ListItemText
              primary={user.username}
              secondary={`Room: ${user.room}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
