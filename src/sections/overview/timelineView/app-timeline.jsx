import Slider from 'react-slick';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { getClientJourny } from 'src/services/userService';

// import Loading from 'src/components/loading/loading';

import './style/slider.css';
import './style/slick-theme.css';
import './style/index.css';

const HorizontalTimeline = () => {
  const sliderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [journyStages, setjournyStages] = useState([]);
  const [journyValue, setjournyValue] = useState('');

  const clientJourny = async () => {
    setIsLoading(true);
    try {
      const journyData = await getClientJourny('King Plumbing');
      const data = journyData?.data;
      console.log('data', data);
      setjournyStages(data?.journyFields);

      const activeIndex = data.journyFields.findIndex((item) => item.value === data.journyValue);

      setjournyValue(activeIndex);

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    clientJourny();
  }, []);

  useEffect(() => {
    if (sliderRef.current && journyValue !== undefined) {
      sliderRef.current.slickGoTo(Number(journyValue) - 1, true); // Scroll to the specific card
    }
  }, [journyValue]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    margin: 20,
    slidesToScroll: 1,
    // centerMode: true,
  };

  console.log('journyValue', journyValue);

  return (
    <Box className="timeline-container">
      {isLoading ? (
        <div> </div>
      ) : (
        <Box className="timeline-horizontal-line">
          <Slider ref={sliderRef} {...settings}>
            {journyStages.map((stage, index) => (
              <div className="timeline-item-container">
                <Box className={`timeline-dot ${index <= journyValue ? 'active' : ''}`} />
                <Box className={`timeline-line ${index <= journyValue ? 'active' : ''}`} />
                <Paper elevation={3} className="timeline-paper">
                  <Typography gutterBottom>{stage?.label}</Typography>
                  {/* <Divider className="timeline-divider" /> */}
                  {/* {eventDetails.map((detail, index) => (
                      <Typography key={index} variant="body2">
                        {detail}
                      </Typography>
                    ))} */}
                </Paper>
              </div>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default HorizontalTimeline;
