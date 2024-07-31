import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';

import './index.css'; // Import the CSS file

import { getClientAuthlist, fetchCalanderEvents } from 'src/services/userService';

import Loading from 'src/components/loading';

import EventCalendar from '../evenets-calendar';
import CreateEventModal from '../create-events';

const CalendarViewDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState('My');
  const [selectedUser, setSelectedUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allCalendarEvents, setAllCalendarEvents] = useState([]);
  const [clientCalanderEvents, setClientCalanderEvents] = useState([]);

  useEffect(() => {
    if (searchTerm && searchTerm?.length) {
      setFilteredUsers(
        clients.filter(
          (user) =>
            (user?.fullName && user?.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user?.email && user?.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    } else {
      setFilteredUsers(clients);
    }
  }, [searchTerm, clients]);

  const getAuthClientList = useCallback(async () => {
    try {
      setIsLoading(true);
      const resData = await getClientAuthlist({ email: 'mudassariqbal.dev@gmail.com' });
      const data = resData?.data;

      const { clientList, email, calendarEvents } = data;

      setClients(clientList);
      setFilteredUsers(clientList);

      setAllCalendarEvents((prevState) => [...prevState, { email, calendarEvents }]);
      // setClientCalendarEventsValue(data);
      setSelectedUser({ email });

      setIsLoading(false);
    } catch (error) {
      console.log('Failed to fetch calendar events', error);
    }
  }, []);

  useEffect(() => {
    getAuthClientList();
  }, [getAuthClientList]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 'My') {
      const matchedEvent = allCalendarEvents.find(
        (value) => value.email === 'mudassariqbal.dev@gmail.com'
      );
      if (matchedEvent) {
        setClientCalendarEventsValue(matchedEvent);
      }
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    handleClose();
  };

  const setClientCalendarEventsValue = (value) => {
    const { email, calendarEvents } = value;
    setClientCalanderEvents(
      calendarEvents
        .filter((event) => event.summary !== 'Home')
        .map((event) => ({
          title: event.summary,
          description: event.description,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          extendedProps: {
            email: event?.creator?.email || email,
          },
          //   url: event?.htmlLink,
          id: event?.id, // Include event ID
        }))
    );
  };

  const getSelectedCleintEvents = useCallback(
    async (clientData) => {
      setSubLoading(true);
      const matchedEvent = allCalendarEvents.find((event) => event.email === clientData?.email);
      if (matchedEvent) {
        setClientCalendarEventsValue(matchedEvent);
        setSubLoading(false);
      } else {
        try {
          const calenderEvents = await fetchCalanderEvents({ email: clientData?.email });
          const evenetData = calenderEvents?.data;

          const { email, calendarEvents } = evenetData;

          setAllCalendarEvents((prevState) => [...prevState, { email, calendarEvents }]);

          setClientCalendarEventsValue(evenetData);
          setSubLoading(false);
        } catch (error) {
          console.log('Failed to fetch calendar events', error);
        }
      }
    },
    [allCalendarEvents]
  );

  useEffect(() => {
    if (selectedUser && Object.keys(selectedUser)?.length) {
      getSelectedCleintEvents(selectedUser);
    }
  }, [selectedUser, getSelectedCleintEvents]);

  const sortEventsByStartDate = (events) => {
    console.log('events', events);
    return events.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));
  };

  const handleEventCreated = (newEvent) => {
    const newEventData = {
      title: newEvent.summary,
      description: newEvent.description,
      start: newEvent.start.dateTime || newEvent.start.date,
      end: newEvent.end.dateTime || newEvent.end.date,
      extendedProps: {
        email: newEvent?.creator?.email,
      },
      //   url: newEvent?.htmlLink,
      id: newEvent?.id, // Include event ID
    };

    setClientCalanderEvents((prevEvents) => sortEventsByStartDate([...prevEvents, newEventData]));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Button onClick={handleClick} variant="contained">
              {selectedTab} Calendar View
            </Button>

            <Button variant="contained" onClick={openModal} startIcon={<EventIcon />}>
              Create Event
            </Button>
          </Box>

          <CreateEventModal
            modalOpen={isModalOpen}
            handleModalClose={closeModal}
            selectedUser={selectedUser}
            handleEventCreated={handleEventCreated}
          />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="styled-menu"
          >
            <div>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="tabs example"
                className="styled-tabs"
              >
                <Tab label="My" value="My" />
                <Tab label="Client" value="Client" />
              </Tabs>

              {selectedTab === 'Client' && (
                <div>
                  <Divider />
                  <TextField
                    label="Search Client"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-field"
                  />

                  <List>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleUserSelect(user)}
                          className="list-item"
                        >
                          <Box>
                            <Typography>{user?.email}</Typography>
                            <Typography variant="body2">{user?.fullName}</Typography>
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>No clients found</ListItem>
                    )}
                  </List>
                </div>
              )}
            </div>
          </Menu>

          {/* {selectedUser && <div>Selected User: {selectedUser?.fullName}</div>} */}
          {subLoading ? (
            <Loading />
          ) : (
            clientCalanderEvents && <EventCalendar events={clientCalanderEvents} />
          )}
        </>
      )}
    </div>
  );
};

export default CalendarViewDropdown;
