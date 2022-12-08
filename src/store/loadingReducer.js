const defaultState = {
  loading: false,
};

const LOADING = 'LOADING';
const NOT_LOADING = 'NOT_LOADING';

export const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: state.loading = action.payload};
    case NOT_LOADING:
      return {...state, loading: state.loading = action.payload};
    default:
      return state;
  }
};

export const loadingAction = () => ({type: LOADING, payload: true});
export const notLoadingAction = () => ({type: NOT_LOADING, payload: false});
