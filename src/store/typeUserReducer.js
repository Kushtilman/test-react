const defaultState = {
  type: 'id',
};

const TYPE_SORT = 'TYPE_SORT';

export const typeUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPE_SORT:
      return {...state, type: action.payload};
    default:
      return state;
  }
};

export const typeSortAction = (payload) => ({type: TYPE_SORT, payload});
