import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Grid, TextField, Button, MenuItem, Paper, Typography, Alert, CircularProgress
} from '@mui/material';
import { Color } from '../../../assets/colors'; // Adjust path as needed

const AddQA = () => {
  const [form, setForm] = useState({
    categoryId: '',
    questions: { hindi: '', english: '' },
    answer: { hindi: '', english: '' },
    keywords: '',
  });

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://api.astroone.in/api/chatbot/user/get_all_category');
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      keywords: form.keywords.split(',').map((k) => k.trim()),
    };

    try {
      await axios.post('https://api.astroone.in/api/chatbot/admin/create_qa', payload);
      setStatus('success');
      setTimeout(() => navigate('/letter-to-god/qa'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <Paper sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={600}>📝 Add New Q&A</Typography>
          <Button onClick={() => navigate('/letter-to-god/qa')} variant="contained" color="primary">All QAs</Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            fullWidth
            required
            disabled={loadingCategories}
          >
            <MenuItem value="">-- Select a category --</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.categoryName?.hindi} / {cat.categoryName?.english}
              </MenuItem>
            ))}
          </TextField>
          {loadingCategories && <CircularProgress size={24} sx={{ mt: 1 }} />}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Question (Hindi)"
            name="questions.hindi"
            placeholder="हिंदी में प्रश्न लिखें"
            value={form.questions.hindi}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Question (English)"
            name="questions.english"
            placeholder="Write question in English"
            value={form.questions.english}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Answer (Hindi)"
            name="answer.hindi"
            placeholder="हिंदी में उत्तर लिखें"
            value={form.answer.hindi}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Answer (English)"
            name="answer.english"
            placeholder="Write answer in English"
            value={form.answer.english}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Keywords (comma separated)"
            name="keywords"
            placeholder="e.g. spirituality, peace, ध्यान"
            value={form.keywords}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Q&A
          </Button>
        </Grid>

        {status === 'success' && (
          <Grid item xs={12}><Alert severity="success">✅ Q&A added successfully!</Alert></Grid>
        )}
        {status === 'error' && (
          <Grid item xs={12}><Alert severity="error">❌ Failed to add Q&A. Try again.</Alert></Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default AddQA;
