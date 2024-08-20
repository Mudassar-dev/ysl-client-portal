import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { formatPrice } from 'src/utils/format-number';
import { formattedDate } from 'src/utils/format-date';

import './style/slider.css';
import './style/slick-theme.css';
import './style/index.css';

export default function Billing_Timeline({ timelineData }) {
  //   const sliderRef = useRef(null);

  //   useEffect(() => {
  //     if (sliderRef.current && activeSlider !== undefined) {
  //       sliderRef.current.slickGoTo(Number(activeSlider) - 1, true); // Scroll to the specific card
  //     }
  //   }, [activeSlider]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    margin: 20,
    nav: false,
    slidesToScroll: 1,
    // centerMode: true,
  };

  return (
    <section className="">
      <Container maxWidth="lg" className="container-lg">
        {/* <Typography variant="h1">Slider</Typography> */}
        <Box className="wrapper">
          <Box className="payment_Slider roadmap_Slider">
            <Slider {...settings}>
              {timelineData?.map((data, index) => (
                <Box className={`roadmapWrap ${data?.status === 'paid' ? 'active' : ''}`}>
                  <Typography
                    component="span"
                    className={`phase ${data?.status === 'paid' ? 'active' : ''}`}
                  >
                    {data?.status === 'paid' ? <CheckIcon /> : <> </>}
                  </Typography>
                  <Box className={`roadmapWrap_content ${data?.status === 'paid' ? 'active' : ''}`}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={<strong>Total Amount: </strong>}
                          secondary={formatPrice(data?.total) + data.currency_code}
                        />
                      </ListItem>

                      {data?.amount_paid && (
                        <ListItem>
                          <ListItemText
                            primary={<strong>Paid amount: </strong>}
                            secondary={formatPrice(data?.amount_paid) + data.currency_code}
                          />
                        </ListItem>
                      )}

                      {data?.paid_at && (
                        <ListItem>
                          <ListItemText
                            primary={<strong>Paid at: </strong>}
                            secondary={formattedDate(data?.paid_at)}
                          />
                        </ListItem>
                      )}

                      {data?.paid_on && (
                        <ListItem>
                          <ListItemText
                            primary={<strong>Paid on: </strong>}
                            secondary={formattedDate(data?.paid_on)}
                          />
                        </ListItem>
                      )}
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

Billing_Timeline.propTypes = {
  timelineData: PropTypes.array.isRequired,
  // activeSlider: PropTypes.string.isRequired,
  // timelineData: PropTypes.array.isRequired,
};
