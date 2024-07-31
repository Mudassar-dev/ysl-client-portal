import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getCleintBillingDetails } from 'src/services/userService';

import Loading from 'src/components/loading';

import './index.css';
import InfoCard from '../info-card';
import InviceSection from '../invoice-section';
import Subscriptions from '../Subscriptions-card';
// import CustomerConfigurations from '../customerConfigurations-card';

// ----------------------------------------------------------------------

export default function BillingView() {
  const [isLoading, setIsLoading] = useState(true);
  const [billingData, setBillingData] = useState({});

  const getBillingDetails = async () => {
    setIsLoading(true);
    try {
      const resData = await getCleintBillingDetails('King Plumbing');
      setBillingData(resData?.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    getBillingDetails();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Billing</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
      </Stack>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="info-reports">
          <InfoCard billingData={billingData} />
          {/* <CustomerConfigurations /> */}
          <Subscriptions billingData={billingData} />
          <InviceSection />
        </section>
      )}
      {/* <InviceSection /> */}
    </Container>
  );
}
