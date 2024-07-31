import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

function InvoiceAccordion() {
  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <div className="according-listing">
        <Grid container spacing={2} className="row mx-0">
          <Grid item xs={3} className="col-3">
            <Typography variant="h6">ID</Typography>
          </Grid>
          <Grid item xs={3} className="col-3">
            <Typography variant="h6">Status</Typography>
          </Grid>
          <Grid item xs={3} className="col-3">
            <Typography variant="h6">Created On</Typography>
          </Grid>
          <Grid item xs={3} className="col-3">
            <Typography variant="h6">Total</Typography>
          </Grid>
        </Grid>

        <Accordion className="accordion" id="accordionExample">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid
              container
              spacing={2}
              className="row"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <Grid item xs={3} className="col-3">
                11285
              </Grid>
              <Grid item xs={3} className="col-3">
                <Typography className="active-bage">Paid</Typography>
              </Grid>
              <Grid item xs={3} className="col-3">
                10 July 2024
              </Grid>
              <Grid item xs={3} className="col-3">
                $110,00 USD
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <Typography>
              <Typography className="active-bage">
                Paid <small>on 10 July 2024</small>
              </Typography>
              <Typography variant="h3">Invoice for $5,640.00 USD</Typography>
              <Typography>
                <strong>Name :</strong> Julia Prochnow
              </Typography>
              <Typography>
                <strong>Invoiced On :</strong> 27-Apr-2024 00:00 America/Chicago
              </Typography>
              <Typography>
                <strong>Amount Due :</strong> $0.00
              </Typography>
              <Typography>
                <strong>Billing Period :</strong> Apr 27 - Oct 26, 2024
              </Typography>
              <Typography>
                <strong>Next Billing Date :</strong> 27-Oct-2024 00:00 America/Chicago
              </Typography>
              <Typography>
                <strong>Channel :</strong> WEB
              </Typography>
              <Typography>
                <strong>Due Date :</strong> 27-Apr-2024 00:00 America/Chicago
              </Typography>
              <Typography>
                <strong>Payment Terms Due :</strong> Upon Receipt
              </Typography>

              <TableContainer component={Paper} className="table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Items</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>63 core</TableCell>
                      <TableCell>$6,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>63 core</TableCell>
                      <TableCell>$6,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container spacing={2} className="row mt-3">
                {/* <Grid item xs={6} className="col-6"></Grid> */}
                <Grid item xs={3} className="col-3">
                  Total
                </Grid>
                <Grid item xs={3} className="col-3">
                  $56,2310 USD
                </Grid>
              </Grid>

              <Grid container spacing={2} className="row mt-3">
                {/* <Grid item xs={6} className="col-6"></Grid> */}
                <Grid item xs={3} className="col-3">
                  Amount Paid
                </Grid>
                <Grid item xs={3} className="col-3">
                  <Typography variant="h5">$589,135</Typography>
                </Grid>
              </Grid>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
}

export default InvoiceAccordion;
