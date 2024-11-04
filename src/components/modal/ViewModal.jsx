import React from 'react';
import { Button, Container, Dialog, DialogTitle } from '@mui/material';

const ViewModal = ({ openModal, title, description, text, handleCloseModal }) => {
    return (
        <Dialog open={openModal} onClose={handleCloseModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>{title}</div>
                <Button onClick={handleCloseModal}>Cancel</Button>
            </DialogTitle>
            {description && <Container sx={{ paddingBottom: "50px" }}>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Container>}
            {text && <Container sx={{ paddingBottom: "50px" }}>
                <div style={{ textAlign: 'justify' }}>{text}</div>
            </Container>}
        </Dialog>
    )
}

export default ViewModal;