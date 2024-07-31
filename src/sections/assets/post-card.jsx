import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardActionArea from '@mui/material/CardActionArea';

// import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function PostCard({ file }) {
  const { name, thumbnailLink, webViewLink } = file;
  return (
    <Grid item xs={12} sm={6} md={3}>
      <CardActionArea component="a" href={webViewLink} target="_blank" rel="noopener noreferrer">
        <Card>
          <Box position="relative" pt="calc(100% * 3 / 4)">
            <Box
              component="img"
              alt={name}
              src={thumbnailLink || '/assets/newImages/document-preview.png'}
              sx={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box p={3}>
            <Link
              href="#"
              color="inherit"
              variant="subtitle2"
              underline="hover"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
              }}
            >
              {name}
            </Link>
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

PostCard.propTypes = {
  file: PropTypes.object.isRequired,
};
