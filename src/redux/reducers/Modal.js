import {
  SET_MODAL
} from '../actions';

const initialState = null;

const Modal = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return action.modal;
    default:
      return state;
  }
};

export default Modal;
