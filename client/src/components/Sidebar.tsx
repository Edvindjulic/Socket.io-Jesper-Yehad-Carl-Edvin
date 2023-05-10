import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Rooms from "./Rooms";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = isMobile ? "80vw" : isTablet ? "40vw" : "20vw";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else if (isTablet) {
      setTabletOpen(!tabletOpen);
    }
  };

  return (
    <>
      <CssBaseline />
      {(isMobile || isTablet) && (
        <Box
          sx={{
            position: "fixed",
            zIndex: theme.zIndex.drawer + 1,
            top: 0,
            left: 10,
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              padding: "0.5rem",
            }}
          >
            {isMobile || isTablet ? (
              mobileOpen || tabletOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )
            ) : null}
          </IconButton>
        </Box>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            display: "block",
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiDrawer-paperAnchorLeft": {
            borderRight: "1px solid #7D99B4",
          },
        }}
        variant={isMobile || isTablet ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? mobileOpen : isTablet ? tabletOpen : undefined}
        onClose={isMobile ? handleDrawerToggle : isTablet ? handleDrawerToggle : undefined}
        ModalProps={{ keepMounted: true }}
      >
        <Rooms />
      </Drawer>
    </>
  );
}

