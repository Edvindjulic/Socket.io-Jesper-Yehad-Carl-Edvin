import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSocket } from "../context/SocketContext";

export default function Users() {
  const { users, createPrivateRoom } = useSocket();


  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Divider sx={{ width: "100%", margin: "auto" }} />
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            All Users ({users.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.userID}
                sx={{ py: 0 }}
                button
                onClick={() => createPrivateRoom(user.userID)}
              >
                <ListItemIcon>
                  <CircleTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#57B49F" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={user.username}
                  secondary={
                    user.room === "Default"
                      ? "No room"
                      : user.room.includes("DM-")
                      ? "User in a DM"
                      : `Room: ${user.room}`
                  }
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ width: "100%", margin: "auto" }} />
    </Box>
  );
}
