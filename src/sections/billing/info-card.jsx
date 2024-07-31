import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

export default function InfoCard({ billingData }) {
  const { customerDetails, upcoming_payment } = billingData;
  return (
    <Card className="card-box">
      <CardContent>
        <Typography variant="h4">{customerDetails?.company}</Typography>
        <Typography>{customerDetails?.email}</Typography>
        <Typography>
          {customerDetails?.first_name} {customerDetails?.last_name}
        </Typography>
        <Box className="card-dashed" mt={2}>
          <Typography variant="h6" className="card-title">
            Summary
          </Typography>

          {/* <Typography>
            <b>0</b> total amount dueChip
          </Typography> */}

          <Typography>
            <b>
              {formatPrice(upcoming_payment?.total)} {upcoming_payment?.currency_code}
            </b>{' '}
            upcoming payment on {formattedDate(upcoming_payment?.next_billing_at)}
          </Typography>

          <Typography>
            <b>
              {formatPrice(customerDetails?.unbilled_charges)}{' '}
              {customerDetails?.preferred_currency_code}
            </b>{' '}
            unbilled charges not invoiced yet
          </Typography>

          <Typography>
            <b>
              {formatPrice(customerDetails?.promotional_credits)}{' '}
              {customerDetails?.preferred_currency_code}
            </b>{' '}
            promotional Credits available
          </Typography>

          <Typography>
            <b>
              {formatPrice(customerDetails?.refundable_credits)}{' '}
              {customerDetails?.preferred_currency_code}
            </b>{' '}
            refundable Credits available
          </Typography>

          <Typography>
            <b>
              {formatPrice(customerDetails?.excess_payments)}{' '}
              {customerDetails?.preferred_currency_code}
            </b>{' '}
            excess payments received
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

InfoCard.propTypes = {
  billingData: PropTypes.object.isRequired,
};
