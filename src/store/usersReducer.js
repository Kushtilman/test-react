const defaultState = {
  users: [],
  openUser: {},
};

const ALL_USERS = 'ALL_USERS';
const VIEW_USER = 'VIEW_USER';

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {...state, users: [...action.payload]};
    case VIEW_USER:
      return {...state, openUser: {...action.payload}};
    default:
      return state;
  }
};

export const allUsersAction = (payload) => ({type: ALL_USERS, payload});
export const viewUserAction = (payload) => ({type: VIEW_USER, payload});
