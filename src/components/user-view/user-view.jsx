import React, {useEffect} from 'react';
import Loading from '../loading/loading';
import {useParams} from 'react-router-dom';

import './user-view.scss';
import {useDispatch, useSelector} from 'react-redux';
import {loadingAction, notLoadingAction} from '../../store/loadingReducer';
import {viewUserAction} from '../../store/usersReducer';
import {viewUser} from '../../services/api-service';

const UserView = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const user = useSelector((state) => state.openUser.openUser);
  const params = useParams();

  useEffect(() => {
    dispatch(loadingAction());
    viewUser(`admin/${params.id}`)
      .then((data) => {
        dispatch(viewUserAction(data.data));
        dispatch(notLoadingAction());
      });
  }, []);

  return (
    <div className="container">
      {loading ?
        <Loading/> :
        <div>
          <h2>User information:</h2>
          <ul className="user-info">
            <li>id: {user.id}</li>
            <li>user name: {user.userName}</li>
            <li>email: {user.email}</li>
          </ul>
        </div>
      }
    </div>
  );
};

export default UserView;
