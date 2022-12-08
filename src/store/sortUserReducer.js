const defaultState = {
  sort: 'ASC',
};

const SORT_USER_ASC = 'SORT_USER_ASC';
const SORT_USER_DESC = 'SORT_USER_DESC';

export const sortUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SORT_USER_ASC:
      return {...state, sort: state.sort = action.payload};
    case SORT_USER_DESC:
      return {...state, sort: state.sort = action.payload};
    default:
      return state;
  }
};

export const sortUserAscAction = () => ({type: SORT_USER_ASC, payload: 'ASC'});
export const sortUserDescAction = () => ({type: SORT_USER_DESC, payload: 'DESC'});
