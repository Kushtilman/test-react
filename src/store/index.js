import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {modalReducer} from './modalReducer';
import {usersReducer} from './usersReducer';
import {loadingReducer} from './loadingReducer';
import {sortUserReducer} from './sortUserReducer';
import {typeUserReducer} from './typeUserReducer';
import thunk from 'redux-thunk';

const rootReduces = combineReducers( {
  users: usersReducer,
  openUser: usersReducer,
  loading: loadingReducer,
  sort: sortUserReducer,
  type: typeUserReducer,
  modal: modalReducer,
});

export const store = createStore(rootReduces, composeWithDevTools(applyMiddleware(thunk)));
