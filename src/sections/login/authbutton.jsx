// src/AuthButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleLogin } from '@react-oauth/google';

import Button from '@mui/material/Button';

export default function AuthButton({ onSuccess }) {
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('response', code);
      onSuccess(code);
    },
    onError: (error) => {
      console.error('Login failed', error);
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  return (
    <Button className="button" onClick={() => login()}>
      Sign in with Google
    </Button>
  );
}

AuthButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
