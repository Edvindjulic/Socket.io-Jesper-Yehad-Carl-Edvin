// components/SelectUsername.tsx
import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

interface SelectUsernameProps {
  onInput: (username: string) => void;
}

export default function SelectUsername({ onInput }: SelectUsernameProps) {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      onInput(username);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleUsernameSubmit}>
      <TextField
        label="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}