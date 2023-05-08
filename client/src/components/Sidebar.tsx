import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Rooms from "../components/Rooms";
import UsersInRoom from "../components/UsersInRoom";

const drawerWidth = "20vw";

export default function Sidebar({
  room,
  users,
}: {
  room: string;
  users: string[];
}) {
  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiDrawer-paperAnchorLeft": {
            borderRight: "1px solid #7D99B4",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Rooms />
        {room && <UsersInRoom room={room} users={users} />}
      </Drawer>
    </>
  );
}
