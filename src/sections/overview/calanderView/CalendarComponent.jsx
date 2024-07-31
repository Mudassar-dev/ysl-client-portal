// src/CalendarComponent.js

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ApiCalendar from 'react-google-calendar-api';

// Material-UI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Initialize ApiCalendar
const calendar = new ApiCalendar({
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
});

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleAuthClick = async () => {
    setLoading(true);
    setAuthError(null);

    try {
      await calendar.handleAuthClick();
      setIsAuthenticated(true);

      // Fetch events after successful authentication
      const response = await calendar.listEvents({
        timeMin: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(), // One year ago
        maxResults: 100, // Adjust as needed
        singleEvents: true,
        orderBy: 'startTime',
      });

      const fetchedEvents = response.result.items;
      setEvents(
        fetchedEvents
          .filter((event) => event.summary !== 'Home')
          .map((event) => ({
            title: event.summary || '',
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
            url: event?.htmlLink,
            id: event?.id, // Include event ID
          }))
      );
    } catch (error) {
      console.error('Authentication or fetching events failed:', error);
      setAuthError('Failed to authenticate or fetch events.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (e) => {
    const eventUrl = e.event.url;
    if (eventUrl) {
      e.jsEvent.preventDefault();
      window.open(eventUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              Loading...
            </Typography>
          </Box>
        ) : (
          <>
            {authError ? (
              <Typography variant="h6" color="error">
                {authError}
              </Typography>
            ) : (
              <>
                {!isAuthenticated ? (
                  <Button variant="contained" color="primary" onClick={handleAuthClick}>
                    Authenticate with Google
                  </Button>
                ) : (
                  <Box style={{ height: '600px', width: '100%' }}>
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      events={events}
                      eventClick={handleEventClick}
                    />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}
