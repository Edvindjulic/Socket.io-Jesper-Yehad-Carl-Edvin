import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Rooms from "./Rooms";
import UsersInRoom from "./UsersInRoom";

const drawerWidth = "20vw";

export default function Sidebar({
  username,
  onRoomSelection,
}: {
  username: string;
  onRoomSelection: (room: string) => void;
}) {
  const [selectedRoom, setSelectedRoom] = useState("");

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
        <Rooms
          setSelectedRoom={setSelectedRoom}
          onRoomSelection={onRoomSelection}
          username={username} // Pass the username prop to the Rooms component
        />
        {selectedRoom && (
          <UsersInRoom room={selectedRoom} username={username} />
        )}
      </Drawer>
    </>
  );
}
