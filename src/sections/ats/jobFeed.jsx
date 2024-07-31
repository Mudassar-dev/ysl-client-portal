import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function JobFeed({ jobFeedValue, jobFeedData, handleJobFeedTabChange }) {
  return (
    <Grid item xs={12} md={3} className="grid-view">
      <Box>
        <Typography variant="h4" className="title">
          Job feed
        </Typography>

        <Tabs
          orientation="vertical"
          value={jobFeedValue}
          onChange={handleJobFeedTabChange}
          className="nav nav-pills"
        >
          {jobFeedData?.map((jobFeed, index) => (
            <Tab key={index} label={jobFeed?.title} value={jobFeed?.id} className="nav-link" />
          ))}
        </Tabs>
      </Box>
    </Grid>
  );
}

JobFeed.propTypes = {
  jobFeedValue: PropTypes.number.isRequired,
  jobFeedData: PropTypes.array.isRequired,
  handleJobFeedTabChange: PropTypes.func.isRequired,
};
