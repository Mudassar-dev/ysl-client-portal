import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import "./index.css"

export default function Loading (){
  return (
    <Box className="dynamic-loader">
      <CircularProgress />
    </Box>
  );
};

