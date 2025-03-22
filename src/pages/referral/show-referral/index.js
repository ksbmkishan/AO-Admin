import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import moment from "moment";

const ShowReferral = () => {
  const location = useLocation();
  const { referral_code } = location.state || {}; // Retrieve the referral code from state
  const [referredUsers, setReferredUsers] = useState([]); // Store referred users data
  const [referrerDetails, setReferrerDetails] = useState(null); // Store referrer details

  // Fetch referral details using the referral code
  const fetchReferralDetails = async () => {
    try {
      const response = await axios.post(
        "https://astrooneapi.ksdelhi.net/api/customers/track-referrers",
        { referral_code },
        { headers: { "Content-Type": "application/json" } }
      );
      const { referrer, referredUsers } = response.data.data;
      setReferrerDetails(referrer); // Set referrer details
      setReferredUsers(referredUsers); // Set referred users
    } catch (error) {
      console.error("Error fetching referral details:", error);
    }
  };

  useEffect(() => {
    if (referral_code) {
      fetchReferralDetails();
    }
  }, [referral_code]);

  // Define columns for the table
  const columns = [
    { name: "S.No.", selector: (row, index) => index + 1, width: "80px" },
    { name: "Name", selector: (row) => row.customerName || "N/A" },
    { name: "Phone", selector: (row) => row.phoneNumber || "N/A" },
    { name: "Login Status", selector: (row) => row.loginStatus || "N/A" },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY") || "N/A",
    },
  ];

  return (
    <div>
      {/* Referrer Details */}
      {referrerDetails && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Referrer Details</h3>
          <p><strong>Name:</strong> {referrerDetails.customerName}</p>
          <p><strong>Phone:</strong> {referrerDetails.phoneNumber}</p>
          <p><strong>Referral Code:</strong> {referrerDetails.referral_code}</p>
          <p><strong>Total Referrals:</strong> {referrerDetails.referral_count}</p>
        </div>
      )}

      {/* Main DataTable for referred users */}
      <MainDatatable
        data={referredUsers}
        columns={columns}
        title="Referred Users"
      />
    </div>
  );
};

export default ShowReferral;
