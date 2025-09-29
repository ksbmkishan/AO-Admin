import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
  Box,
} from "@mui/material";
import axios from "axios";

const WelcomeMessagePage = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState({ hindi: "", english: "" });
  const [original, setOriginal] = useState({ hindi: "", english: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchWelcomeMessage = async () => {
    try {
      const res = await axios.get("https://api.astroone.in/api/chatbot/user/get_welcome_message");
      if (res.data.success) {
        setMessage(res.data.data.welcomeMessage);
        setOriginal(res.data.data.welcomeMessage);
      } else {
        throw new Error("Failed to fetch message");
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Fetch failed", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { welcomeMessage: message };
      const res = await axios.post("https://api.astroone.in/api/chatbot/admin/update_welcome_message", payload);
      if (res.data.success) {
        setSnackbar({ open: true, message: "Message updated successfully", severity: "success" });
        setOriginal(message);
        setEditing(false);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Update error", severity: "error" });
    }
  };

  const handleCancel = () => {
    setMessage(original);
    setEditing(false);
  };

  const handleChange = (lang, value) => {
    setMessage(prev => ({ ...prev, [lang]: value }));
  };

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "#fff",
        // maxWidth: 1000,
        margin: "40px auto",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          backgroundColor: "#D56A14",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Chatbot Welcome Message
        </Typography>
        {!loading && !editing && (
          <Button
            variant="contained"
            onClick={() => setEditing(true)}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Edit Message
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Hindi Message */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Hindi Message
            </Typography>
            {editing ? (
              <TextField
                multiline
                fullWidth
                minRows={5}
                value={message.hindi}
                onChange={e => handleChange("hindi", e.target.value)}
                placeholder="प्रिय {name}, आप क्या जानना चाहते हैं? 😊"
              />
            ) : (
              <Typography sx={{ whiteSpace: "pre-line", color: "#555", minHeight: "120px", p: 1, border: "1px solid #eee", borderRadius: 2 }}>
                {message.hindi || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* English Message */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              English Message
            </Typography>
            {editing ? (
              <TextField
                multiline
                fullWidth
                minRows={5}
                value={message.english}
                onChange={e => handleChange("english", e.target.value)}
                placeholder="Dear {name}, what would you like to know? 😊"
              />
            ) : (
              <Typography sx={{ whiteSpace: "pre-line", color: "#555", minHeight: "120px", p: 1, border: "1px solid #eee", borderRadius: 2 }}>
                {message.english || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Buttons */}
          {editing && (
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-start">
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default WelcomeMessagePage;
