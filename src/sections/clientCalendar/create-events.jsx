import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { addCalanderEvent } from 'src/services/userService';

export default function CreateEventModal({
  modalOpen,
  handleModalClose,
  selectedUser,
  handleEventCreated,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const [attendees, setAttendees] = useState([{ email: '' }]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(null);
    setStartTime('');
    setEndTime('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const startDateTime =
      date && startTime
        ? date.clone().set('hour', startTime.hour()).set('minute', startTime.minute())
        : null;
    const endDateTime =
      date && endTime
        ? date.clone().set('hour', endTime.hour()).set('minute', endTime.minute())
        : null;

    const event = {
      summary: title,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
      },
      end: {
        dateTime: endDateTime.toISOString(),
      },
      //   attendees: attendees.filter((att) => att.email).map((att) => ({ email: att.email })),
    };

    try {
      const response = await addCalanderEvent({
        email: selectedUser?.email,
        event,
      });

      console.log('Event created: ', response.event);
      handleEventCreated(response.event);

      resetForm();
      handleModalClose();
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          width: 600,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          pt: 6,
          pb: 6,
        }}
      >
        <IconButton onClick={handleModalClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Schedule Event
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={6}>
            <TextField
              label="Title"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
            />
          </Grid>

          <Grid xs={12} sm={6} md={6}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid xs={12} sm={6} md={4}>
              <DatePicker
                label="Event Date"
                value={date}
                disablePast
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={4}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            marginTop: '25px',
          }}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Event'}
        </Button>

        {/* <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            marginTop: '25px',
          }}
        >
          Create Event
        </Button> */}
      </Box>
    </Modal>
  );
}

CreateEventModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object.isRequired,
  handleEventCreated: PropTypes.func.isRequired,
};
