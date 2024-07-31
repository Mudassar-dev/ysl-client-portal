import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function Profile_Info({ candidateProfile }) {
  const { name, emails, phones, social, links, photo_url } = candidateProfile;
  return (
    <Card className="card-box">
      <CardContent>
        <Box display="flex" className="media">
          <img className="img-fluid" src={photo_url} alt="Profile" />
          <Box ml={2} className="media-body">
            <Typography variant="h5">{name}</Typography>
            {/* <Typography variant="body2">description</Typography> */}
          </Box>
        </Box>
        <Divider />
        <Grid container alignItems="center" sx={{ py: 2 }}>
          <Grid item lg={5}>
            <Typography variant="h6">
              {/* <image className="me-1" /> */}
              Email
            </Typography>
          </Grid>
          <Grid item lg={7}>
            {emails && emails.length ? (
              emails?.map((email, index) => (
                <Typography key={index} variant="body2">
                  {email}
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
            <Typography variant="h6">
              {/* <PhoneIcon className="me-1" /> */}
              Phone
            </Typography>
          </Grid>
          <Grid item lg={7}>
            {phones && phones.length ? (
              phones?.map((phone, index) => (
                <Typography key={index} variant="body2">
                  {phone}
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
            <Typography variant="h6">
              {/* <ShareIcon className="me-1" /> */}
              Social
            </Typography>
          </Grid>
          <Grid item lg={7}>
            {social && social.length ? (
              social?.map((link, index) => (
                <Typography key={index} variant="body2">
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </Link>
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
            <Typography variant="h6">
              {/* <LinkIcon className="me-1" /> */}
              Links
            </Typography>
          </Grid>
          <Grid item lg={7}>
            {links && links.length ? (
              links?.map((link, index) => (
                <Typography key={index} variant="body2">
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </Link>
                </Typography>
              ))
            ) : (
              <Typography variant="body2">----</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

Profile_Info.propTypes = {
  candidateProfile: PropTypes.object.isRequired,
};
