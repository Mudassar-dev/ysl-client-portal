import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function Profile_Field({ candidateProfile }) {
  const { skills, address, communication_skills, relevant_experience } = candidateProfile;

  return (
    <>
      <Typography variant="h4">Profile Field</Typography>
      <Card className="card-box">
        <CardContent>
          <Grid container alignItems="center" sx={{ py: 2 }}>
            <Grid item lg={5}>
              <Typography variant="h6">Skills</Typography>
            </Grid>
            <Grid item lg={7}>
              {skills && skills.length ? (
                <Box>
                  {skills?.map((skill, index) => (
                    <Chip sx={{ mt: 1 }} key={index} label={skill?.text} className="light-bage" />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">----</Typography>
              )}
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" sx={{ py: 2 }}>
            <Grid item lg={5}>
              <Typography variant="h6">Address</Typography>
            </Grid>
            <Grid item lg={7}>
              {address && address.length ? (
                address?.map((data, index) => (
                  <Typography key={index} variant="body2">
                    {data?.text}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">----</Typography>
              )}
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" sx={{ py: 2 }}>
            <Grid item lg={5}>
              <Typography variant="h6">Communication Skills</Typography>
            </Grid>
            <Grid item lg={7}>
              {communication_skills && communication_skills.length ? (
                communication_skills?.map((communication, index) => (
                  <Typography key={index} variant="body2">
                    {communication?.value}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">----</Typography>
              )}
            </Grid>
          </Grid>

          <Divider />
          <Grid container alignItems="center" sx={{ py: 2 }}>
            <Grid item lg={5}>
              <Typography variant="h6">Relevant Experience</Typography>
            </Grid>
            <Grid item lg={7}>
              {relevant_experience && relevant_experience.length ? (
                relevant_experience?.map((experience, index) => (
                  <Typography key={index} variant="body2">
                    {experience?.text}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">----</Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

Profile_Field.propTypes = {
  candidateProfile: PropTypes.object.isRequired,
};
