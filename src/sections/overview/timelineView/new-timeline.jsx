import Slider from 'react-slick';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { getClientJourny } from 'src/services/userService';

import './style/slider.css';
import './style/slick-theme.css';
import './new-index.css';

export default function Roadmap() {
  //   const [isLoading, setIsLoading] = useState(false);
  const [journyStages, setjournyStages] = useState([]);
  //   const [journyValue, setjournyValue] = useState('');

  const clientJourny = async () => {
    // setIsLoading(true);
    try {
      const journyData = await getClientJourny('King Plumbing');
      const data = journyData?.data;
      setjournyStages(data?.journyFields);

      //   const activeIndex = data.journyFields.findIndex((item) => item.value === data.journyValue);

      //   setjournyValue(activeIndex);

      //   setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    clientJourny();
  }, []);

  //   useEffect(() => {
  //     if (sliderRef.current && journyValue !== undefined) {
  //       sliderRef.current.slickGoTo(Number(journyValue) - 1, true); // Scroll to the specific card
  //     }
  //   }, [journyValue]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    margin: 20,
    slidesToScroll: 1,
    // centerMode: true,
  };
  return (
    <section className="">
      <Container maxWidth="lg" className="container-lg">
        <Typography variant="h1">Slider</Typography>
        <Box className="wrapper">
          <Box className="roadmap_Slider">
            <Slider {...settings}>
              {journyStages.map((stage, index) => (
                <Box className="roadmapWrap">
                  <Typography variant="subtitle1" className="phase">
                    Phase 1
                  </Typography>
                  <Box className="roadmapWrap_content">
                    <List>
                      <ListItem>
                        <ListItemText primary="Token Launch" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Website + Social Media Launch" />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              ))}
            </Slider>
            {/* <Box className="roadmapWrap">
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="roadmapWrap">
              <Typography variant="subtitle1" className="phase">
                Phase 2
              </Typography>
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="roadmapWrap">
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="roadmapWrap">
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="roadmapWrap">
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="roadmapWrap">
              <Typography variant="subtitle1" className="phase">
                Phase 3
              </Typography>
              <Box className="roadmapWrap_content">
                <List>
                  <ListItem>
                    <ListItemText primary="Token Launch" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Website + Social Media Launch" />
                  </ListItem>
                </List>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
