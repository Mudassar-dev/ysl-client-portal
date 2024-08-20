import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function InvoiceDetail({
  id,
  title,
  status,
  date,
  total,
  invoiceData,
  expanded,
  onToggle,
}) {
  const isExpanded = expanded === id;

  const [invoiceDetails, setInvoiceDetails] = useState({});

  useEffect(() => {
    setInvoiceDetails(invoiceData);
  }, [invoiceData]);

  const CollapseView = (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <Box id={id} className="accordion-collapse collapse show">
        <CardContent>

          <Typography>
            <span className="active-badge">
              Paid <small>{invoiceDetails?.date}</small>
            </span>
          </Typography>
          <Typography variant="h3">Invoice for {invoiceDetails?.amount}</Typography>
          <Typography>
            <b>Name :</b> {invoiceDetails?.name}
          </Typography>
          <Typography>
            <b>Invoiced On:</b> {invoiceDetails?.invoicedOn}
          </Typography>
          <Typography>
            <b>Amount Due:</b> {invoiceDetails?.amountDue}
          </Typography>
          <Typography>
            <b>Billing Period:</b> {invoiceDetails?.billingPeriod}
          </Typography>
          <Typography>
            <b>Next Billing Date:</b> {invoiceDetails?.nextBillingDate}
          </Typography>
          <Typography>
            <b>Channel:</b> {invoiceDetails?.channel}
          </Typography>
          <Typography>
            <b>Due Date:</b> {invoiceDetails?.dueDate}
          </Typography>
          <Typography>
            <b>Payment Terms Due:</b> {invoiceDetails?.paymentTermsDue}
          </Typography>
       
          <Box component="table" className="table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails?.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </Box>
          <Grid container className="mt-3">
            <Grid item xs={6} sm={3} />
            <Grid item xs={3} sm={6}>
              <Typography>Total</Typography>
            </Grid>
            <Grid item xs={3} sm={6}>
              <Typography>{invoiceDetails?.totalAmount}</Typography>
            </Grid>
          </Grid>
          <Grid container className="mt-3">
            <Grid item xs={6} sm={3} />
            <Grid item xs={3} sm={6}>
              <Typography>Amount Paid</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">{invoiceDetails?.amountPaid}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Collapse>
  );

  return (
    <Box className="accordion-item">
      <Box
        className="row"
        onClick={() => onToggle(id)}
        aria-expanded={isExpanded}
        aria-controls={id}
      >
        <Grid container>
          <Grid item xs={3}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="active-badge">{status}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{date}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{total}</Typography>
          </Grid>
        </Grid>
      </Box>
      {CollapseView}
    </Box>
  );
}

InvoiceDetail.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  invoiceData: PropTypes.object.isRequired,
  expanded: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};
