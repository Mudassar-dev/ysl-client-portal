import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchCalanderEvents } from 'src/services/userService';

import EventCalendar from 'src/sections/clientCalendar/evenets-calendar';

export default function CalendarView() {
  const [userCalendarEvents, setUserCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsercalenderEvents = async () => {
    try {
      setIsLoading(true);
      const calenderEvents = await fetchCalanderEvents({ email: 'mudassariqbal.dev@gmail.com' });
      const evenetData = calenderEvents?.data;

      const { email, calendarEvents } = evenetData;

      setUserCalendarEvents(
        calendarEvents
          .filter((event) => event.summary !== 'Home')
          .map((event) => ({
            title: event.summary,
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
            extendedProps: {
              email,
            },
            //   url: event?.htmlLink,
            id: event?.id,
          }))
      );
      setIsLoading(false);
    } catch (error) {
      console.log('Failed to fetch calendar events', error);
    }
  };
  useEffect(() => {
    getUsercalenderEvents();
  }, []);
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
            {/* <Typography variant="h6" mt={2}>
              Loading...
            </Typography> */}
          </Box>
        ) : (
          <EventCalendar events={userCalendarEvents} />
        )}
      </Box>
    </Container>
  );
}
