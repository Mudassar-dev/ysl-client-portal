import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function CustomerConfigurations() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" className="card-title">
        Customer Configurations
      </Typography>
      <Card className="card-box">
        <CardContent>
          <Box className="list-items">
            <Typography>Preferred currency</Typography>
            <Typography variant="h6">USD</Typography>
          </Box>
          <Box className="list-items">
            <Typography>Direct debit</Typography>
            <Typography variant="h6">Disabled</Typography>
          </Box>
          <Box className="list-items">
            <Typography>Auto collection</Typography>
            <Typography variant="h6">On</Typography>
          </Box>
          <Box className="list-items">
            <Typography>Payment terms</Typography>
            <Typography variant="h6">Due Upon Receipt</Typography>
          </Box>
          <Box className="list-items">
            <Typography>
              Applies only when customer&apos;s auto-collection is off. All invoices will be
              generated as Posted.
            </Typography>
            <Typography variant="h6">Next Billing On</Typography>
          </Box>
          <Box className="list-items">
            <Typography>27-Oct-2024 00:00</Typography>
            <Typography variant="h6">Date on</Typography>
          </Box>
          <Box className="list-items">
            <Typography>Next Billing Amount</Typography>
            <Typography variant="h6">$5,640.00</Typography>
          </Box>
          <Box className="list-items">
            <Typography>Consolidated Invoicing</Typography>
            <Typography variant="h6">Use Site Default</Typography>
          </Box>
          <Box className="list-items">
            <Typography>
              A separate invoice will be generated for every subscription charge of this customer.
            </Typography>
            <Typography variant="h6">Closure of invoices</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CustomerConfigurations;
