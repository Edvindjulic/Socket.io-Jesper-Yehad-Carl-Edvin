import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Bot from "../assets/bot.png";

export default function NoRoom() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const titleFontSize = isMobile ? "1.8rem" : isTablet ? "2rem" : "2.2rem";
  const descriptionFontSize = isMobile ? "1rem" : isTablet ? "1rem" : "1.25rem";

  const imageSize = isMobile ? 250 : isTablet ? 300 : 350;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: isMobile || isTablet ? 0 : "20vw",
        height: "80vh",
      }}
    >
      <img src={Bot} alt="My Project" width={imageSize} height={imageSize} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile || isTablet ? "1rem" : 0,
          marginLeft: "1rem",
          marginRight: "1rem",
        }}
      >
        <Box
          sx={{
            maxWidth: "370px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: titleFontSize,
            }}
          >
            Ready to chat?
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "350px",
            display: "flex",
            flexDirection: "row",
            gap: "0.2rem",
          }}
        >
          <CheckIcon sx={{ color: "green" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: descriptionFontSize,
            }}
          >
            Pick a room or create your own for a personalized chat experience!
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "350px",
            display: "flex",
            flexDirection: "row",
            gap: "0.2rem",
          }}
        >
          <CheckIcon sx={{ color: "green" }} />
          <Typography
            variant="body1"
            sx={{
              fontSize: descriptionFontSize,
            }}
          >
            Want to have a private conversation? Send a direct message to connect one-on-one!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
