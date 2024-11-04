import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { connect } from "react-redux";

const Loader = ({ isLoading }) => {
  return (
    <Modal open={isLoading}>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.dashboard.isLoading,
});

export default connect(mapStateToProps, null)(Loader);
