import React, { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { getClientJourny } from 'src/services/userService';

import Timeline from 'src/components/timeline-view/timeline';
import TimelineSkeleton from 'src/components/loading-placeholder/timeline';

export default function Roadmap() {
  const sliderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [journyStages, setjournyStages] = useState([]);
  const [journyValue, setjournyValue] = useState('');

  const clientJourny = async () => {
    setIsLoading(true);
    try {
      const journyData = await getClientJourny('King Plumbing');
      const data = journyData?.data;
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
    nav: false,
    slidesToScroll: 1,
    // centerMode: true,
  };
  return (
    <section className="">
      <Container maxWidth="lg" className="container-lg">
        {/* <Typography variant="h1">Slider</Typography> */}
        {isLoading ? (
          <TimelineSkeleton sliderSettings={settings} />
        ) : (
          <Timeline
            sliderSettings={settings}
            activeSlider={journyValue}
            timelineData={journyStages}
          />
        )}
      </Container>
    </section>
  );
}
