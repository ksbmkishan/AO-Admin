import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Dialog, DialogTitle } from '@mui/material';
import * as CommonActions from '../../redux/actions/commonAction';

const ViewTextModal = () => {
    const dispatch = useDispatch();
    const { textModalIsOpen, textModalData } = useSelector(state => state?.commonReducer);

    return (
        <Dialog open={textModalIsOpen} onClose={() => dispatch(CommonActions?.closeTextModal())} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>{textModalData?.title}</div>
                <Button onClick={() => dispatch(CommonActions?.closeTextModal())}>Cancel</Button>
            </DialogTitle>

            {textModalData?.type == 'editor' && <Container sx={{ paddingBottom: "50px" }}>
                <div dangerouslySetInnerHTML={{ __html: textModalData?.text }}></div>
            </Container>}

            {!textModalData?.type && <Container sx={{ paddingBottom: "50px" }}>
                <div style={{ textAlign: 'justify' }}>{textModalData?.text}</div>
            </Container>}
        </Dialog>
    )
}

export default ViewTextModal;