import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import '../timeline-view/style/slider.css';
import '../timeline-view/style/slick-theme.css';
import '../timeline-view/style/index.css';

export default function TimelineSkeleton({ sliderSettings }) {
  return (
    <section className="">
      <Container maxWidth="lg" className="container-lg">
        <Box className="wrapper">
          <Box className="roadmap_Slider">
            <Slider {...sliderSettings}>
              {/* Simulate multiple slides with skeletons */}
              {Array.from(new Array(3)).map((_, index) => (
                <Box className="roadmapWrap active" key={index}>
                  {/* Skeleton for Phase Title */}
                  <Typography variant="subtitle1" className="phase">
                    <Skeleton variant="text" width={40} height={15} />
                  </Typography>
                  <Box className="roadmapWrap_content active">
                    <List>
                      <ListItem>
                        {/* Skeleton for List Item */}
                        <ListItemText>
                          <Skeleton variant="text" width="10" />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

TimelineSkeleton.propTypes = {
  sliderSettings: PropTypes.object.isRequired,
};
