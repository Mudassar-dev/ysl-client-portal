import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getCleintAtsData } from 'src/services/userService';

import Loading from 'src/components/loading/loading';

import './index.css';
import JobFeed from '../jobFeed';
import CandidateFeed from '../candidateFeed';

function AssetsPage() {
  const [jobFeedValue, setjobFeedValue] = React.useState('');
  const [tabValue, setTabValue] = React.useState('qualified');

  const [atsData, setAtsData] = useState([]);
  const [jobFeedData, setJobFeedData] = useState([]);
  const [candidateFeedData, setCandidateFeedData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const handleJobFeedTabChange = (event, newValue) => {
    setjobFeedValue(newValue);

    const candidateFeed = atsData?.candidateFeed;
    const candidateData = candidateFeed.find((candidate) => candidate.offerId === newValue);

    setCandidateFeedData(candidateData);
    setTabValue('qualified');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAtsData = async () => {
    setIsLoading(true);
    try {
      const AtsData = await getCleintAtsData('King Plumbing');
      const data = AtsData?.data;
      const jobFeed = data?.jobFeed;

      if (jobFeed && jobFeed.length) {
        setjobFeedValue(jobFeed[0]?.id);

        const candidateFeed = data?.candidateFeed;
        setAtsData(data);
        setJobFeedData(jobFeed);

        const candidateData = candidateFeed.find(
          (candidate) => candidate.offerId === jobFeed[0]?.id
        );

        setCandidateFeedData(candidateData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    getAtsData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        ATS
      </Typography>
      <Box className="assets-page">
          {isLoading ? (
            <Loading />
          ) : (
            <Grid container spacing={2}>
              <JobFeed
                jobFeedValue={jobFeedValue}
                jobFeedData={jobFeedData}
                handleJobFeedTabChange={handleJobFeedTabChange}
              />
              <CandidateFeed
                candidateFeedData={candidateFeedData}
                tabValue={tabValue}
                handleTabChange={handleTabChange}
              />
            </Grid>
          )}
      </Box>
    </Container>
  );
}

export default AssetsPage;
