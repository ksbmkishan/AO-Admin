import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableContainer,
  Box,
  TextField,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const PlanPurchasedHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    customerName: "",
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://astrooneapi.ksdelhi.net/api/chatbot/admin/get_all_purchase_history`,
        {
          params: {
            page,
            limit: pagination.limit,
            customerName: filters.customerName,
            startDate: filters.startDate,
            endDate: filters.endDate,
          },
        }
      );
      if (res.data.success) {
        setPurchases(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch purchase history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line
  }, [page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    fetchPurchases();
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        📜 Purchased Plan History
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <TextField
          label="Customer Name"
          name="customerName"
          value={filters.customerName}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      {/* Loader or Table */}
      {loading ? (
        <Box textAlign="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#D56A14" }}>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Plan Title</TableCell>
                  <TableCell>Messages</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Purchased On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.length > 0 ? (
                  purchases.map((purchase, index) => (
                    <TableRow key={purchase._id}>
                      <TableCell>
                        {(pagination.page - 1) * pagination.limit + index + 1}
                      </TableCell>
                      <TableCell>{purchase?.userId?.customerName || "N/A"}</TableCell>
                      <TableCell>{purchase?.userId?.phoneNumber || "N/A"}</TableCell>
                      <TableCell>{purchase?.planId?.title || "N/A"}</TableCell>
                      <TableCell>{purchase?.planId?.messages || "N/A"}</TableCell>
                      <TableCell>{purchase?.planId?.divyaRashi || "N/A"}</TableCell>
                      <TableCell>
                        {dayjs(purchase?.purchasedAt).format("DD MMM YYYY, hh:mm A")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={pagination.totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default PlanPurchasedHistory;
