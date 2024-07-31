import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import './view/index.css';

export default function EventCalendar({ events }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setAnchorEl(info.el);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'event-popover' : undefined;

  const renderEventContent = (eventInfo) => {
    const startTime = eventInfo.event.start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const endTime = eventInfo.event.end.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <div className="event-content">
        <span className="event-time">
          {startTime} - {endTime}
        </span>
      </div>
    );
  };

  return (
    <Container>
      <Box style={{ height: '600px', width: '100%' }}>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Card className="card">
              <CardContent>
                {selectedEvent && (
                  <>
                    {selectedEvent?.title && selectedEvent?.title !== 'undefined' && (
                      <Typography variant="h5" component="h2" className="eventTitle">
                        {selectedEvent.title}
                      </Typography>
                    )}

                    {selectedEvent?.extendedProps?.description && (
                      <Typography variant="body2" color="textSecondary" className="eventDetail">
                        <strong>Description: </strong> {selectedEvent?.extendedProps?.description}
                      </Typography>
                    )}

                    {selectedEvent?.start && (
                      <Typography variant="body2" color="textSecondary" className="eventDetail">
                        <strong>Date: </strong> {selectedEvent.start.toDateString()}
                      </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary" className="eventDetail">
                      <strong>Time: </strong> {selectedEvent.start.toLocaleTimeString()} -{' '}
                      {selectedEvent.end.toLocaleTimeString()}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" className="eventDetail">
                      <strong>Email: </strong> {selectedEvent?.extendedProps?.email}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      <strong>Synced events can&apos;t be edited</strong>
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Popover>
        </div>
      </Box>
    </Container>
  );
}

EventCalendar.propTypes = {
  events: PropTypes.array.isRequired,
};
