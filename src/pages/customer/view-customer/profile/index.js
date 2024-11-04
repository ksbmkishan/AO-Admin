import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Divider, Avatar, List, ListItem, ListItemText, Box } from "@mui/material";
import { base_url } from "../../../../utils/api-routes";
import moment from "moment/moment";

const Profile = ({ customer }) => {
    const { customerName, image, email, phoneNumber, dateOfBirth, gender, address, alternateNumber, wallet_balance, banned_status, call_status, chat_status, createdAt, device_id, fcmToken, first_wallet_recharged, isBlock, isDeleted, isOnline, isOtpVerified, isSignupCompleted, is_registered, new_user, otp, status, timeOfBirth, updatedAt, } = customer;

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: "15px" }}>
            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={`${base_url + 'uploads/'}${image}`}
                        alt={customerName}
                        style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {customerName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Phone: </strong> {phoneNumber}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email: </strong> {email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Gender: </strong> {gender}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location: </strong> {address?.city ? address?.city + ',' : ''} {address?.state ? address?.state + ',' : ''} {address?.country} - {address?.zipCode}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date of Birth: </strong> {moment(dateOfBirth).format('DD MMM YYYY')}
                        </Typography>
                        {/* <Typography variant="body1">
                            <strong>Time of Birth: </strong> {timeOfBirth}
                        </Typography> */}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;