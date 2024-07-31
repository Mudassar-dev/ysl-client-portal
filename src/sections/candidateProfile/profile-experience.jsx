import React from 'react';
import PropTypes from 'prop-types';
import { format, formatDistance } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function Profile_Experience({ candidateProfile }) {
  const { experience } = candidateProfile;

  const formatData = (date) => {
    if (date) {
      const formattedDate = format(new Date(date), 'MMMM yyyy');
      return formattedDate;
    }
    return date || 'Unknown';
  };

  const getdifference = (startDate, endDate) => {
    if (startDate && endDate) {
      const difference = formatDistance(new Date(startDate), new Date(endDate), {
        addSuffix: true,
      });
      return difference;
    }
    return '';
  };
  return (
    <Box mt={4}>
      <Typography variant="h4">Experience</Typography>
      <Card className="card-box">
        <CardContent>
          {experience.map((data, index) => (
            <Box key={index} sx={{ my: 2 }}>
              <Typography variant="h6">{data?.title}</Typography>
              <Typography variant="h6">{data?.company}</Typography>
              <Typography variant="body2">
                {formatData(data?.start_date)} - {formatData(data?.end_date)}
                {'  '}
                {getdifference(data?.start_date, data?.end_date)}
              </Typography>

              <Typography variant="body2">{data?.location}</Typography>

              <Divider />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

Profile_Experience.propTypes = {
  candidateProfile: PropTypes.object.isRequired,
};
