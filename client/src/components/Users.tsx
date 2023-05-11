import { List, ListItem, ListItemText, Typography, ListItemIcon } from "@mui/material";
import { useSocket } from "../context/SocketContext";
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';

export default function Users() {
  const { users } = useSocket();

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
        }}
      >
        Online Users ({users.length})
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.userID} sx={{py: 0}}>
            <ListItemIcon>
              <CircleTwoToneIcon fontSize="small" sx={{ color: '#57B49F' }} />
            </ListItemIcon>
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
