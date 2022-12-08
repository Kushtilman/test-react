const defaultState = {
  modal: false,
};

const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSED = 'MODAL_CLOSED';

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {...state, modal: state.modal = action.payload};
    case MODAL_CLOSED:
      return {...state, modal: state.modal = action.payload};
    default:
      return state;
  }
};

export const modalOpenAction = () => ({type: MODAL_OPEN, payload: true});
export const modalClosedAction = () => ({type: MODAL_CLOSED, payload: false});
