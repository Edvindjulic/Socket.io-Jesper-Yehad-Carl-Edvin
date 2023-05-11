import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSocket } from "../context/SocketContext";

export default function Users() {
  const { users, createPrivateRoom } = useSocket();
  console.log("nu loggar vi ut users:", users);

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
          <ListItem
            key={user.userID}
            sx={{ py: 0 }}
            button
            onClick={() => createPrivateRoom(user.userID)}
          >
            <ListItemIcon>
              <CircleTwoToneIcon fontSize="small" sx={{ color: "#57B49F" }} />
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
