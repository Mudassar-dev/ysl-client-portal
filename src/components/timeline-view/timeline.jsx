import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import './style/slider.css';
import './style/slick-theme.css';
import './style/index.css';

export default function Timeline({ sliderSettings, activeSlider, timelineData }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current && activeSlider !== undefined) {
      sliderRef.current.slickGoTo(Number(activeSlider) - 1, true); // Scroll to the specific card
    }
  }, [activeSlider]);

  return (
    <section className="">
      <Container maxWidth="lg" className="container-lg">
        <Box className="wrapper">
          <Box className="roadmap_Slider">
            <Slider ref={sliderRef} {...sliderSettings}>
              {timelineData.map((stage, index) => (
                <Box className={`roadmapWrap ${index <= activeSlider ? 'active' : ''}`} key={index}>
                  <Typography variant="subtitle1" className="phase">
                    Phase {index + 1}
                  </Typography>
                  <Box className={`roadmapWrap_content ${index <= activeSlider ? 'active' : ''}`}>
                    <List>
                      <ListItem>
                        <ListItemText primary={stage?.label} />
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

Timeline.propTypes = {
  sliderSettings: PropTypes.object.isRequired,
  activeSlider: PropTypes.string.isRequired,
  timelineData: PropTypes.array.isRequired,
};
