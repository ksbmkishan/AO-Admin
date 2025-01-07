import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Grid, Tab, Tabs } from '@mui/material';
import { base_url } from '../../../utils/api-routes';
import Profile from './profile';
import ChatHistory from './chat-history';
import CallHistory from './call-history';
import LiveHistory from './live-history';
import PujaHistory from './puja-history';
import OrderHistory from './order-history';
import ReviewHistory from './review-history';
import VideoCallHistory from './video-call-history';
import { IndianRupee } from '../../../utils/common-function';
import * as CustomerActions from '../../../redux/actions/customerAction';
import MudraHistory from './mudra-history';
import MudraRequestHistory from './mudra-request-history';

const ViewCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let stateData = location.state && location.state.stateData;

    const dispatch = useDispatch();
    const { customerByIdData } = useSelector(state => state?.customerReducer);

    const { customerName, image, email, phoneNumber, wallet_balance, dateOfBirth, timeOfBirth, address } = customerByIdData;

    const tabHead = ['Profile', 'Chat', 'Call', 'Video Call', 'Live', 'Puja', 'Order', 'Review', 'Mudra', 'Mudra Request'];
    const [activeTabHead, setActiveTabHead] = useState(0);
    const handleChange = (event, newValue) => setActiveTabHead(newValue);

    useEffect(() => {
        //! Dispatching API For Get Customer By ID 
        dispatch(CustomerActions.getCustomerById({ customerId: stateData?._id }))
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>

                <Grid container spacing={2} rowGap={5} sx={{ alignItems: 'center', padding: "20px 30px" }}>
                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Avatar src={base_url + 'uploads/' + image} style={{ width: 100, height: 100, borderRadius: "50%", border: '1px solid' }} variant="rounded" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{customerName}</div>
                                <div>{phoneNumber}</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid', paddingLeft: "20px" }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Contact Details</div>
                            <div>{email}</div>
                            <div>{address?.city ? address?.city + ',' : ''} {address?.state ? address?.state + ',' : ''} {address?.country} - {address?.zipCode}</div>
                            <div>Wallet : {IndianRupee(wallet_balance?.toFixed(2))}</div>
                            <div>Mudra : N/A</div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid', paddingLeft: "20px" }}>
                            <div style={{ fontWeight: "bold", fontSize: '18px' }}>Details</div>
                            <div>Date of Birth : {dateOfBirth ? moment(dateOfBirth).format('DD MMM YYYY') : 'N/A'}</div>
                            <div>Time of Birth : {timeOfBirth ? moment(timeOfBirth).format('hh:mm:ss') != 'Invalid date' ? moment(timeOfBirth).format('hh:mm:ss') : timeOfBirth : 'N/A'}</div>
                        </div>
                    </Grid>
                </Grid>
            </div >

            <div style={{ display: 'flex', justifyContent: 'center', padding: "20px 0", }}>
                <Box sx={{ width: '100%', flexGrow: 1, bgcolor: 'background.paper', maxWidth: { xs: '85vw', md: 'calc(100vw - 300px)' }, alignSelf: 'center' }}>
                    <Tabs value={activeTabHead} onChange={handleChange} variant="scrollable" scrollButtons={true} sx={{ gap: "50px" }}>
                        {tabHead?.map((value, index) => <Tab key={index} label={value} />)}
                    </Tabs>
                </Box>
            </div>

            <div style={{ padding: "20px 0" }}>
                {activeTabHead == 0 && <div><Profile customer={stateData} /></div>}
                {activeTabHead == 1 && <div><ChatHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 2 && <div><CallHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 3 && <div><VideoCallHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 4 && <div><LiveHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 5 && <div><PujaHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 6 && <div><OrderHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 7 && <div><ReviewHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 8 && <div><MudraHistory customerId={stateData?._id} /></div>}
                {activeTabHead == 9 && <div><MudraRequestHistory customerId={stateData?._id} /></div>}
            </div>
        </>
    )
}

export default ViewCustomer;