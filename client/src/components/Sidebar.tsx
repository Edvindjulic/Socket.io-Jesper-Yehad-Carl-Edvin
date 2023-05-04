import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Rooms from "./Rooms";

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
            borderRight: "none",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Rooms />
      </Drawer>
    </>
  );
}
