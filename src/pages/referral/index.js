import React, { useEffect, useState } from "react";
import axios from "axios";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ReferralTable = () => {
    const navigate = useNavigate();
    const [referralData, setReferralData] = useState([]); // Stores top referrers
    const [referredUsers, setReferredUsers] = useState([]); // Stores referred users for modal
    const [selectedReferrer, setSelectedReferrer] = useState(null); // Stores selected referrer details
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state


    // Fetch top referrers
    const fetchTopReferrers = async () => {
        try {
            const response = await axios.get(
                "https://api.astroone.in/api/customers/top-referrers",
                {}
            );
            console.log("response :::>>>", response)
            setReferralData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching top referrers:", error);
        }
    };

    // Fetch referral details (referrer and referred users)
    const fetchReferralDetails = async (referralCode) => {
        try {
            const response = await axios.post(
                "https://api.astroone.in/api/customers/track-referrers",
                { referral_code: referralCode },
                { headers: { "Content-Type": "application/json" } }
            );
            const { referrer, referredUsers } = response.data.data;
            setSelectedReferrer(referrer); 
            setReferredUsers(referredUsers);
            setIsModalOpen(true); 
        } catch (error) {
            console.error("Error fetching referral details:", error);
        }
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReferrer(null);
        setReferredUsers([]);
    };

    useEffect(() => {
        fetchTopReferrers();
    }, []);

    // Columns configuration for the main table
    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, width: "80px" },
        { name: "Referrer Name", selector: (row) => row.customerName || "N/A" },
        { name: "Phone Number", selector: (row) => row.phoneNumber || "N/A" },
        { name: "Referral Code", selector: (row) => row.referral_code || "N/A" },
        { name: "Referral Count", selector: (row) => row.referral_count || 0 },
        {
            name: "Action",
            selector: (row) => (
                <FaEye
                    style={{ cursor: "pointer" }}
                    //onClick={() => fetchReferralDetails(row.referral_code)}
                    onClick={() => navigate("/referral/show-referral", { state: { referral_code: row.referral_code } })}
                    title="View Referred Users"
                />
            ),
        },
    ];

    return (
        <div>
            {/* Main DataTable */}
            <MainDatatable
                data={referralData}
                columns={columns}
                title={"Top Referrers"}
            />

            {/* Modal for Referred Users */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Referred Users by {selectedReferrer?.customerName}</h3>
                        <p>Phone: {selectedReferrer?.phoneNumber}</p>
                        <p>Referral Code: {selectedReferrer?.referral_code}</p>
                        <p>Referral Count: {selectedReferrer?.referral_count}</p>
                        <hr />
                        <h4>Referred Users:</h4>
                        {referredUsers.length > 0 ? (
                            <ul>
                                {referredUsers.map((user, index) => (
                                    <li key={index}>
                                        {index + 1}. Name: {user.customerName || "N/A"}, Phone:{" "}
                                        {user.phoneNumber}, Status: {user.loginStatus}, Date:{" "}
                                        {moment(user.createdAt).format("DD-MM-YYYY")}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No referred users found.</p>
                        )}
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferralTable;
