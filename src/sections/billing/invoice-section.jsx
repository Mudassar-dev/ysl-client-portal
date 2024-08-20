import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

function InvoiceAccordion({ invoiceData }) {
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
        {Invoice.map((invoice, index) => (
          <Accordion className="accordion" id={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content "
              id="panel1a-header"
            
            >
              <Grid
                container
                spacing={2}
                className="row"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${index}`}
                aria-expanded="true"
                aria-controls={index}
              >
                <Grid item xs={3} className="col-3">
                  {invoice?.id}
                </Grid>
                <Grid item xs={3} className="col-3">
                  <Typography className="active-bage">{invoice?.status}</Typography>
                </Grid>
                <Grid item xs={3} className="col-3">
                  {formattedDate(invoice?.paid_at)}
                </Grid>
                <Grid item xs={3} className="col-3">
                  {formatPrice(invoice?.amount_paid)}
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
                <Box className="card-dashed">
                <Typography className="active-bage">
                  {invoice?.status} <small>on {formattedDate(invoice?.paid_at)}</small>
                </Typography>
                <Typography variant="h3">
                  Invoice for {formatPrice(invoice?.total)} {invoice?.currency_code}
                </Typography>
                <Typography>
                  <strong>Name :</strong> {invoice?.billing_address?.first_name}{' '}
                  {invoice?.billing_address?.last_name}
                </Typography>
                <Typography>
                  <strong>Invoiced On :</strong> {formattedDate(invoice?.date)}{' '}
                  {invoice?.site_details_at_creation?.timezone}
                </Typography>
                <Typography>
                  <strong>Amount Due :</strong> {formatPrice(invoice?.amount_due)}
                </Typography>
                <Typography>
                  <strong>Billing Period :</strong> *Apr 27 - Oct 26, 2024
                </Typography>
                <Typography>
                  <strong>Next Billing Date :</strong> *27-Oct-2024 00:00 America/Chicago
                </Typography>
                <Typography>
                  <strong>Channel :</strong> {invoice?.channel}
                </Typography>
                <Typography>
                  <strong>Due Date :</strong> {formattedDate(invoice?.due_date)}{' '}
                  {invoice?.site_details_at_creation?.timezone}
                </Typography>
                </Box>
                <TableContainer component={Paper} className="table">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Items</TableCell>
                        <TableCell>Amount({invoice?.currency_code})</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice?.line_items.map((item) => (
                        <TableRow>
                          <TableCell>{item?.description}</TableCell>
                          <TableCell>{formatPrice(item?.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container spacing={2} className="row mt-3">
                  <Grid item xs={6} className="col-6">
                    {' '}
                  </Grid>
                  <Grid item xs={3} className="col-3">
                    Total
                  </Grid>
                  <Grid item xs={3} className="col-3">
                    {formatPrice(invoice?.sub_total)}
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="row mt-3">
                  <Grid item xs={6} className="col-6">
                    {' '}
                  </Grid>
                  <Grid item xs={3} className="col-3">
                    Amount Paid
                  </Grid>
                  <Grid item xs={3} className="col-3">
                    <Typography variant="h5">{formatPrice(invoice?.amount_paid)}</Typography>
                  </Grid>
                </Grid>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}

export default InvoiceAccordion;

InvoiceAccordion.propTypes = {
  invoiceData: PropTypes.array.isRequired,
};
