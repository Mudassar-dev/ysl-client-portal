import React from 'react';
import PropTypes from 'prop-types';

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

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

function InvoiceAccordion({ billingData }) {
  const Invoice = [
    {
      id: '242140',
      customer_id: 'Azyi5rUItc7Jj2CLF',
      subscription_id: 'AzZsqkUIztYF12Qzg',
      recurring: true,
      status: 'paid',
      price_type: 'tax_exclusive',
      date: 1721365200,
      due_date: 1721365200,
      net_term_days: 0,
      exchange_rate: 1,
      total: 244300,
      amount_paid: 244300,
      amount_adjusted: 0,
      write_off_amount: 0,
      credits_applied: 0,
      amount_due: 0,
      paid_at: 1721419530,
      updated_at: 1721419533,
      resource_version: 1721419533313,
      deleted: false,
      object: 'invoice',
      first_invoice: true,
      amount_to_collect: 0,
      round_off_amount: 0,
      new_sales_amount: 244300,
      has_advance_charges: false,
      currency_code: 'USD',
      base_currency_code: 'USD',
      generated_at: 1721365200,
      is_gifted: false,
      term_finalized: true,
      channel: 'web',
      tax: 0,
      line_items: [
        {
          id: 'li_16CGUzUJ0Ov7t64Dn',
          date_from: 1721365200,
          date_to: 1724043599,
          unit_amount: 184500,
          quantity: 1,
          amount: 184500,
          pricing_model: 'flat_fee',
          is_taxed: false,
          tax_amount: 0,
          object: 'line_item',
          subscription_id: 'AzZsqkUIztYF12Qzg',
          customer_id: 'Azyi5rUItc7Jj2CLF',
          description: 'Recruiting Base Package',
          entity_type: 'plan_item_price',
          entity_id: 'Recruiting-Base-Package-USD-Monthly',
          tax_exempt_reason: 'tax_not_configured',
          discount_amount: 0,
          item_level_discount_amount: 0,
        },
        {
          id: 'li_16CGUzUJ0Ov8364Do',
          date_from: 1721365200,
          date_to: 1721365200,
          unit_amount: 59800,
          quantity: 1,
          amount: 59800,
          pricing_model: 'flat_fee',
          is_taxed: false,
          tax_amount: 0,
          object: 'line_item',
          subscription_id: 'AzZsqkUIztYF12Qzg',
          customer_id: 'Azyi5rUItc7Jj2CLF',
          description: 'Onboarding Fee',
          entity_type: 'charge_item_price',
          entity_id: 'Onboarding-Cost-USD',
          tax_exempt_reason: 'tax_not_configured',
          discount_amount: 0,
          item_level_discount_amount: 0,
        },
      ],
      sub_total: 244300,
      linked_payments: [
        {
          txn_id: 'txn_16CGUzUJ0Ov9m64Dx',
          applied_amount: 244300,
          applied_at: 1721419533,
          txn_status: 'success',
          txn_date: 1721419530,
          txn_amount: 244300,
        },
      ],
      applied_credits: [],
      adjustment_credit_notes: [],
      issued_credit_notes: [],
      linked_orders: [],
      dunning_attempts: [],
      billing_address: {
        first_name: 'Blake',
        last_name: 'Meehan',
        email: 'bmeehan@airco.com',
        company: 'AirCo Air Conditioning, Heating and Plumbing',
        phone: '+16827014806',
        line1: '1900 Robotics Place',
        city: 'Fort Worth',
        state_code: 'TX',
        state: 'Texas',
        country: 'US',
        zip: '76118',
        validation_status: 'not_validated',
        object: 'billing_address',
      },
      site_details_at_creation: {
        timezone: 'America/Chicago',
      },
    },
  ];
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
              aria-controls="panel1a-content"
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
  billingData: PropTypes.object.isRequired,
};
