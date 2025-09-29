import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const UpdateWelcomeMessage = () => {
  const [messages, setMessages] = useState({
    hindi: '',
    english: '',
  });

  const [error, setError] = useState({
    hindi: '',
    english: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessages({ ...messages, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const validate = () => {
    let valid = true;
    const err = {};
    if (!messages.hindi) {
      err.hindi = 'Please enter Hindi welcome message';
      valid = false;
    }
    if (!messages.english) {
      err.english = 'Please enter English welcome message';
      valid = false;
    }
    setError(err);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setResponseMsg('');

    try {
      const response = await axios.post(
        'https://api.astroone.in/api/chatbot/admin/update_welcome_message',
        { welcomeMessage: messages }
      );

      if (response?.data?.success) {
        setResponseMsg('✅ Welcome message updated successfully!');
      } else {
        setResponseMsg('❌ Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setResponseMsg('❌ API Error: ' + err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: 'auto', marginTop: 5 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Update Welcome Message
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Hindi Welcome Message"
            name="hindi"
            value={messages.hindi}
            onChange={handleChange}
            error={!!error.hindi}
            helperText={error.hindi}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="English Welcome Message"
            name="english"
            value={messages.english}
            onChange={handleChange}
            error={!!error.english}
            helperText={error.english}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Update Message'}
          </Button>
        </Grid>

        {responseMsg && (
          <Grid item xs={12}>
            <Typography color={responseMsg.startsWith('✅') ? 'green' : 'red'}>
              {responseMsg}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default UpdateWelcomeMessage;
