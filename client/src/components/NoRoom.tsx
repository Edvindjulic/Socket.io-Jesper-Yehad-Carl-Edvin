import { Box, Typography } from "@mui/material";

const drawerWidth = "20vw";

export default function NoRoom() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: drawerWidth,

        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "60vw",
          padding: "0.5rem",
          textAlign: "center",
          backgroundColor: "#4C79B5",
        }}
      >
        Please create or join a room to start chatting
      </Typography>
    </Box>
  );
}
