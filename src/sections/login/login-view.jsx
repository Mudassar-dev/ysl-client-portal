import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import './index.css';

export default function LoginView() {

  const handleClick = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <Container className="login-section">
      <img src="/assets/newImages/yellowstonelocal-logo.png" alt="Logo" className="logo" />
      <Typography variant="h4" className="text">
        Welcome to Hiring Portal
      </Typography>
      <Button className="button" onClick={handleClick}>
        Login
      </Button>
    </Container>
  );
}
