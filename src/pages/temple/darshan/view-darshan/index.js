import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as TempleActions from '../../../../redux/actions/templeAction';
import { Color } from '../../../../assets/colors';
import { Avatar } from '@material-ui/core';
import { api_urls } from '../../../../utils/api-urls';

const ViewDarshan = () => {
    const { darshanId } = useParams();
    const dispatch = useDispatch();
    const { templeDarshanByIdData } = useSelector(state => state.templeReducer);

    useEffect(() => {
        //! Dispatching API for Getting Darshan
        dispatch(TempleActions.getTempleDarshanById({ darshanId }))
    }, [darshanId]);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <Avatar src={api_urls + templeDarshanByIdData?.image} style={{ borderRadius: 'initial', height: '150px', width: '150px' }} />
                    <div>
                        <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, marginBottom: '20px' }}>{templeDarshanByIdData?.title}</div>
                        <div>{templeDarshanByIdData?.description}</div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ViewDarshan;