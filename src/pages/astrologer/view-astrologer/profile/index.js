import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Divider, Avatar, List, ListItem, ListItemText, Box } from "@mui/material";
import { base_url } from "../../../../utils/api-routes";
import moment from "moment/moment";
import { IndianRupee } from "../../../../utils/common-function";

const Profile = ({ astrologer }) => {
    const { astrologerName, phoneNumber, alternateNumber, gender, email, profileImage, chat_price, call_price, video_call_price, experience, about, city, state, country, zipCode, currency, free_min, rating, avg_rating, skill, remedies, mainExpertise, youtubeLink, short_bio, long_bio, follower_count, aadharNumber, dateOfBirth, address, country_phone_code, commission_video_call_price, normal_video_call_price, commission_normal_video_call_price, consultation_price, commission_call_price, commission_chat_price, commission_remark, expertise, account_holder_name, account_number, account_type, account_name, IFSC_code, live_notification, chat_notification, call_notification, workingOnOtherApps, activeBankAcount, wallet_balance, panCard, isVerified, isOnline, chat_status, call_status, video_call_status, today_earnings } = astrologer;

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: "15px" }}>
            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={`${base_url}/${profileImage}`}
                        alt={astrologerName}
                        style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {astrologerName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {short_bio}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1">
                            <strong>Experience: </strong> {experience} years
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location: </strong> {city}, {state}, {country} - {zipCode}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Phone: </strong> {phoneNumber} | Alt: {alternateNumber}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email: </strong> {email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Gender: </strong> {gender}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date of Birth: </strong> {moment(dateOfBirth).format('DD MMM YYYY')}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Rating: </strong> {rating?.toFixed(1)}
                        </Typography>
                    </CardContent>
                </Grid>

                {/* About Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        About
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'justify' }}>{long_bio}</Typography>
                </Grid>

                {/* Pricing Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Consultation  Price
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Chat Price:</strong> {IndianRupee(chat_price)}</Typography>
                            <Typography variant="body1"><strong>Call Price:</strong> {IndianRupee(call_price)}</Typography>
                            <Typography variant="body1"><strong>Video Call Price:</strong> {IndianRupee(normal_video_call_price)}</Typography>
                            <Typography variant="body1"><strong>Live Call Price:</strong> {IndianRupee(video_call_price)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Chat Commission Price:</strong> {IndianRupee(commission_chat_price)}</Typography>
                            <Typography variant="body1"><strong>Call Commission Price:</strong> {IndianRupee(commission_call_price)}</Typography>
                            <Typography variant="body1"><strong>Video Call Commission Price:</strong> {IndianRupee(commission_normal_video_call_price)}</Typography>
                            <Typography variant="body1"><strong>Live Call Commission Price:</strong> {IndianRupee(commission_video_call_price)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Skills Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Skills</Typography>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        {skill?.map((value, index) => (
                            <Grid item key={index}>{value?.skill?.trim()}</Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Remedies</Typography>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        {remedies?.map((value, index) => (
                            <Grid item key={index}>
                                <Grid sx={{ fontWeight: '600' }} >{value?.title?.trim()}</Grid>
                                <Grid item >{value?.description}</Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Main Expertise</Typography>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        {mainExpertise?.map((value, index) => (
                            <Grid item key={index}>{value?.mainExpertise?.trim()}</Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" flexWrap="wrap">
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Skills</Typography>
                            <List dense>
                                {skill?.map((skillItem) => (
                                    <ListItem key={skillItem._id}>
                                        <ListItemText primary={skillItem?.skill?.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Remedies</Typography>
                            <List dense>
                                {remedies?.map((rem) => (
                                    <ListItem key={rem._id}>
                                        <ListItemText primary={rem?.title?.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: "250px" }}>
                            <Typography variant="h6" gutterBottom>Main Expertise</Typography>
                            <List dense>
                                {mainExpertise?.map((mainExp) => (
                                    <ListItem key={mainExp._id}>
                                        <ListItemText primary={mainExp?.mainExpertise?.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Grid> */}

                {/* Bank Information Section */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Bank Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Account Holder:</strong> {account_holder_name || 'N/A'}</Typography>
                            <Typography variant="body1"><strong>Account Number:</strong> {account_number || 'N/A'}</Typography>
                            <Typography variant="body1"><strong>Account Type:</strong>  <span style={{ textTransform: 'capitalize' }}>{account_type}</span></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Bank Name:</strong> {account_name}</Typography>
                            <Typography variant="body1"><strong>IFSC Code:</strong> {IFSC_code}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Additional Information
                    </Typography>
                    <Typography variant="body1"><strong>Pan Card:</strong> {panCard}</Typography>
                    <Typography variant="body1"><strong>Aadhar Card:</strong> {aadharNumber}</Typography>
                    <Typography variant="body1"><strong>Chat Status:</strong> {chat_status}</Typography>
                    <Typography variant="body1"><strong>Call Status:</strong> {call_status}</Typography>
                    <Typography variant="body1"><strong>Video Call Status:</strong> {video_call_status}</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;