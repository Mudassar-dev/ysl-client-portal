import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

export default function Subscriptions({ billingData }) {
  const { subscription, customerDetails } = billingData;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" className="card-title">
        {subscription.length} Subscriptions Available
      </Typography>
      {subscription.map((data, index) => (
        <Card key={index} className="card-box">
          <CardContent>
            <Box display="flex" flexDirection="row" mb={1}>
              <Box flex="1" pr={2}>
                <Typography>Status</Typography>
              </Box>
              <Box flex="3">
                <Chip
                  label={data?.status}
                  color={data?.status === 'active' ? 'success' : 'error'}
                />
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" mb={1}>
              <Box flex="1" pr={2}>
                <Typography>Plan</Typography>
              </Box>
              <Box flex="3">
                <Typography>
                  {data?.subscriptionItems?.subscription_items_1?.item_price_id}
                </Typography>
              </Box>
            </Box>

            {data?.subscriptionItems?.subscription_items_1 && (
              <Box display="flex" flexDirection="row" mb={1}>
                <Box flex="1" pr={2}>
                  <Typography>Plan Amount</Typography>
                </Box>
                <Box flex="3">
                  <Typography>
                    {formatPrice(data?.subscriptionItems?.subscription_items_1?.amount)}{' '}
                    {data?.currency_code} / {data?.billing_period}
                    {data?.billing_period_unit} x{' '}
                    {data?.subscriptionItems?.subscription_items_1?.quantity}
                  </Typography>
                </Box>
              </Box>
            )}

            {data?.subscriptionItems?.subscription_items_2 && (
              <Box display="flex" flexDirection="row" mb={1}>
                <Box flex="1" pr={2}>
                  <Typography>Addons</Typography>
                </Box>
                <Box flex="3">
                  <Typography>
                    {data?.subscriptionItems?.subscription_items_2?.item_price_id} ({' '}
                    {formatPrice(data?.subscriptionItems?.subscription_items_2?.amount)}{' '}
                    {data?.currency_code} / {data?.billing_period}
                    {data?.billing_period_unit} x{' '}
                    {data?.subscriptionItems?.subscription_items_2?.quantity})
                  </Typography>
                </Box>
              </Box>
            )}

            <Box display="flex" flexDirection="row" mb={1}>
              <Box flex="1" pr={2}>
                <Typography>Next Billing Amount</Typography>
              </Box>
              <Box flex="3">
                <Typography>
                  {' '}
                  {formatPrice(
                    Number(data?.subscriptionItems?.subscription_items_1?.amount || 0) +
                      Number(data?.subscriptionItems?.subscription_items_2?.amount || 0)
                  )}{' '}
                  {data?.currency_code}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" mb={1}>
              <Box flex="1" pr={2}>
                <Typography>MRR</Typography>
              </Box>
              <Box flex="3">
                <Typography>
                  {formatPrice(data?.mrr)} {data?.currency_code}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" mb={1}>
              <Box flex="1" pr={2}>
                <Typography>Auto Collection</Typography>
              </Box>
              <Box flex="3">
                <Typography>{customerDetails?.auto_collection}</Typography>
              </Box>
            </Box>

            {data?.next_billing_at && (
              <Box display="flex" flexDirection="row" mb={1}>
                <Box flex="1" pr={2}>
                  <Typography>Next billing on</Typography>
                </Box>
                <Box flex="3">
                  <Typography>{formattedDate(data?.next_billing_at)}</Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

Subscriptions.propTypes = {
  billingData: PropTypes.object.isRequired,
};
