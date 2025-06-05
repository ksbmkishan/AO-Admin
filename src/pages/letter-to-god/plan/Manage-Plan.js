import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: '', messages: '', price: '', _id: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const API_BASE = 'https://astrooneapi.ksdelhi.net/api/chatbot/admin';

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/get_all_plan`);
      setPlans(res.data?.data || []);
    } catch (err) {
      showSnackbar('Failed to fetch plans', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.title || !form.messages || !form.price) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(form.messages)) {
      setError('Messages must be a number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/create_plan`, {
        title: form.title,
        messages: parseInt(form.messages),
        divyaRashi: form.price,
      });
      showSnackbar('Plan created successfully', 'success');
      fetchPlans();
      setForm({ title: '', messages: '', price: '', _id: null });
    } catch {
      showSnackbar('Failed to create plan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    const selected = plans[index];
    setForm({
      title: selected.title,
      messages: selected.messages,
      price: selected.divyaRashi,
      _id: selected._id,
    });
    setEditIndex(index);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setForm({ title: '', messages: '', price: '', _id: null });
    setError('');
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/update_plan/${form._id}`, {
        title: form.title,
        messages: parseInt(form.messages),
        divyaRashi: form.price,
      });
      showSnackbar('Plan updated successfully', 'success');
      fetchPlans();
      handleCancelEdit();
    } catch {
      showSnackbar('Failed to update plan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const planToDelete = plans[index];
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE}/delete_plan/${planToDelete._id}`);
        showSnackbar('Plan deleted successfully', 'success');
        fetchPlans();
      } catch {
        showSnackbar('Failed to delete plan', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Paper sx={{ padding: 4, backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>📦 Manage Plans</Typography>

      <Box component="form" sx={{ mb: 4, background: '#fff', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editIndex !== null ? '✏️ Edit Plan' : '➕ Add New Plan'}
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>
        )}

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Message Count"
          name="messages"
          value={form.messages}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={editIndex !== null ? handleSave : handleAdd}>
            {editIndex !== null ? '💾 Save' : '➕ Add'}
          </Button>
          {editIndex !== null && (
            <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
              ❌ Cancel
            </Button>
          )}
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        plans.map((plan, index) => (
          <Paper key={plan._id} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
            <Typography variant="h6">{plan.title}</Typography>
            <Typography><strong>Messages:</strong> {plan.messages}</Typography>
            <Typography><strong>Price:</strong> {plan.divyaRashi}</Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={() => handleEdit(index)}>✏️ Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>🗑️ Delete</Button>
            </Box>
          </Paper>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ManagePlans;
