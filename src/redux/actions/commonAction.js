import * as actionTypes from '../action-types';

export const openTextModal = payload => ({
    type: actionTypes.OPEN_TEXT_MODAL, payload,
});

export const closeTextModal = () => ({
    type: actionTypes.CLOSE_TEXT_MODAL,
});