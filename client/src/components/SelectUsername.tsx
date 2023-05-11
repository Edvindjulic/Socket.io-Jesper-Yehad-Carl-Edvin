import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

interface SelectUsernameProps {
  onInput: (username: string) => void;
}

export default function SelectUsername({ onInput }: SelectUsernameProps) {
  const [username, setUsername] = useState("");
  const [focused, setFocused] = useState(false);

  const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim()) {
      onInput(username);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(180deg, rgba(202, 221, 240, 1) 0%, rgba(230, 237, 248, 0) 100%)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleUsernameSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          value={username}
          onChange={handleUsernameChange}
          InputLabelProps={{ shrink: false }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7D99B4",
              borderWidth: "2px",
            },
            "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
              borderColor: "#7D99B4",
              borderWidth: "2px",
            },
            "& .MuiOutlinedInput-input": {
              borderRadius: "4px",
              borderColor: "#7D99B4",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7D99B4",
            },
            position: "relative",
          }}
          variant="outlined"
          InputProps={{
            startAdornment:
              !username && !focused ? (
                <InputLabel
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    color: "#C7C7C7",
                  }}
                >
                  Enter username
                </InputLabel>
              ) : null,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#57B49F",
            "&:hover": {
              backgroundColor: "#479F8B",
            },
          }}
        >
          Start
        </Button>
      </Box>
    </Box>
  );
}
