import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Rooms from "./Rooms";
import Users from "./Users";

const drawerWidth = "20vw";

export default function Sidebar() {
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
        <Users />
        <Rooms />
      </Drawer>
    </>
  );
}
