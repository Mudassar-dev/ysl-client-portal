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
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

function InvoiceAccordion({ invoiceData }) {
  return (
    <Card className="card-box table-wraper" sx={{ mt: 5, mb: 5 }}>
      <CardContent>
        <Box>
          <div className="according-listing">
            <Grid container spacing={2} className="according-heading">
              <Grid item xs={3}>
                <Typography variant="h6">ID</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">Status</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">Created On</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">Total</Typography>
              </Grid>
            </Grid>

            {invoiceData.map((data, index) => {
              const invoice = data?.invoice;
              return (
                // Safely access the invoice property
                <Accordion className="accordion" id={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid
                      container
                      spacing={2}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${index}`}
                      aria-expanded="true"
                      aria-controls={index}
                    >
                      <Grid item xs={3}>
                        {invoice?.id}
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className="active-bage">{invoice?.status}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        {formattedDate(invoice?.paid_at)}
                      </Grid>
                      <Grid item xs={3}>
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
                          <strong>Billing Period :</strong>
                          {formattedDate(invoice?.line_items[0]?.date_from)} -
                          {formattedDate(invoice?.line_items[0]?.date_to)}
                        </Typography>
                        <Typography>
                          <strong>Channel :</strong> {invoice?.channel}
                        </Typography>
                        <Typography>
                          <strong>Due Date :</strong> {formattedDate(invoice?.due_date)}{' '}
                          {invoice?.site_details_at_creation?.timezone}
                        </Typography>

                        <TableContainer component={Paper} className="table table-container ">
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography>Items</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>Amount({invoice?.currency_code})</Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {invoice?.line_items.map((item) => (
                                <TableRow>
                                  <TableCell>
                                    <Typography>{item?.description}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography>{formatPrice(item?.amount)}</Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            {' '}
                          </Grid>
                          <Grid item xs={3}>
                            Total
                          </Grid>
                          <Grid item xs={3}>
                            <Typography sx={{ pl: 4 }}>
                              {formatPrice(invoice?.sub_total)}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            {' '}
                          </Grid>
                          <Grid item xs={3}>
                            Amount Paid
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="h5" sx={{ pl: 4, mt:2 }}>
                              {formatPrice(invoice?.amount_paid)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InvoiceAccordion;

InvoiceAccordion.propTypes = {
  invoiceData: PropTypes.array.isRequired,
};

