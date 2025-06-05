import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const baseURL = "https://astrooneapi.ksdelhi.net/api/chatbot";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [form, setForm] = useState({ hindi: "", english: "" });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/user/get_all_category`);
      if (res.data.success) {
        setCategories(res.data.data || []);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (err) {
      showSnackbar(err.message || "Fetch error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!form.hindi.trim() || !form.english.trim()) {
      return showSnackbar("Both Hindi and English names are required.", "error");
    }

    try {
      const res = await axios.post(`${baseURL}/admin/create_category`, {
        categoryName: {
          hindi: form.hindi.trim(),
          english: form.english.trim(),
        },
      });

      if (res.data.success) {
        showSnackbar("Category added successfully", "success");
        resetModal();
        fetchCategories();
      } else {
        throw new Error("Category creation failed");
      }
    } catch (err) {
      showSnackbar(err.message || "Error creating category", "error");
    }
  };

  const handleUpdateCategory = async () => {
    if (!form.hindi.trim() || !form.english.trim()) {
      return showSnackbar("Both Hindi and English names are required.", "error");
    }

    try {
      const res = await axios.put(`${baseURL}/admin/udpate_category/${editCategoryId}`, {
        categoryName: {
          hindi: form.hindi.trim(),
          english: form.english.trim(),
        },
      });

      if (res.data.success) {
        showSnackbar("Category updated successfully", "success");
        resetModal();
        fetchCategories();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      showSnackbar(err.message || "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${baseURL}/admin/categories/${id}/delete`);
      showSnackbar("Category deleted", "success");
      fetchCategories();
    } catch (err) {
      showSnackbar("Delete failed", "error");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.post(`${baseURL}/admin/category/${id}/status`, { status: newStatus });
      showSnackbar(`Category ${newStatus}`, "success");
      fetchCategories();
    } catch (err) {
      showSnackbar("Status update failed", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const resetModal = () => {
    setOpenAddModal(false);
    setEditMode(false);
    setEditCategoryId(null);
    setForm({ hindi: "", english: "" });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: 3,
        // maxWidth: 1000,
        margin: "40px auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Manage Chatbot Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditMode(false);
            setForm({ hindi: "", english: "" });
            setOpenAddModal(true);
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead sx={{ backgroundColor: "#D56A14" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>S.No.</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hindi</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>English</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.length > 0 ? (
              categories.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.categoryName?.hindi}</TableCell>
                  <TableCell>{item.categoryName?.english}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item.status === "active" ? "success" : "error"}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleStatusToggle(item._id, item.status)}
                      title="Toggle Status"
                    >
                      {item.status === "active" ? (
                        <ToggleOnIcon color="success" />
                      ) : (
                        <ToggleOffIcon color="error" />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditMode(true);
                        setEditCategoryId(item._id);
                        setForm({
                          hindi: item.categoryName?.hindi || "",
                          english: item.categoryName?.english || "",
                        });
                        setOpenAddModal(true);
                      }}
                      title="Edit"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)} title="Delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Modal */}
      <Dialog
        open={openAddModal}
        onClose={resetModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Hindi Name"
            fullWidth
            margin="normal"
            value={form.hindi}
            onChange={(e) => setForm((prev) => ({ ...prev, hindi: e.target.value }))}
          />
          <TextField
            label="English Name"
            fullWidth
            margin="normal"
            value={form.english}
            onChange={(e) => setForm((prev) => ({ ...prev, english: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetModal} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={editMode ? handleUpdateCategory : handleAddCategory}>
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default CategoryManager;
