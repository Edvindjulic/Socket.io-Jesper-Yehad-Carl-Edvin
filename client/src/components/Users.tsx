import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSocket } from "../context/SocketContext";

export default function Users() {
  const { users } = useSocket();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Online Users ({users.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {users.map((user) => (
            <ListItem key={user.userID} sx={{ py: 0 }}>
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
      </AccordionDetails>
    </Accordion>
  );
}
