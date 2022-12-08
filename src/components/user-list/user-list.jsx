import React, {useEffect, useState} from 'react';
import UserItem from '../user-item/user-item';
import {Table} from 'react-bootstrap';
import {deleteUser, getAllUsers} from '../../services/api-service';
import Loading from '../loading/loading';
import TablePaginationDemo from '../pagination/pagination';
import {useSearchParams} from 'react-router-dom';
import Search from '../search/search';
import {useDispatch, useSelector} from 'react-redux';
import {loadingAction, notLoadingAction} from '../../store/loadingReducer';
import {allUsersAction} from '../../store/usersReducer';
import {sortUserAscAction, sortUserDescAction} from '../../store/sortUserReducer';
import {typeSortAction} from '../../store/typeUserReducer';
import './user-list.scss';

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const users = useSelector((state) => state.users.users);
  const sort = useSelector((state) => state.sort.sort);
  const type = useSelector((state) => state.type.type);

  const page = searchParams.get('page') || 0;
  const rowsPerPage = searchParams.get('limit') || 5;
  const searchTerm = searchParams.get('search') || '';
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(loadingAction());
    getAllUsers(`admin?sort=${type},${sort}`)
      .then((data) => {
        dispatch(allUsersAction(data.data));
        dispatch(notLoadingAction());
      });
  }, [type, sort]);

  // sorting
  const handleSort = (newType) => {
    dispatch(typeSortAction(newType));
    if (type !== newType) {
      dispatch(sortUserAscAction());
    } else if (type === newType) {
      if (sort === 'DESC') {
        dispatch(sortUserAscAction());
      } else {
        dispatch(sortUserDescAction());
      }
    } else {
      dispatch(sortUserAscAction());
    }
    setSearchParams({sort: sort});
  };

  // pagination
  const handleChangePage = (e, newPage) => {
    if (newPage) {
      setSearchParams({page: newPage});
    } else {
      setSearchParams({});
    }
  };

  const handleChangeRowsPerPage = (e) => {
    const limit = e.target.value;
    if (limit) {
      setSearchParams({limit});
    } else {
      setSearchParams({});
    }
  };

  // search
  const searchUsers = users.filter(
    (user) => user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({search});
    } else {
      setSearchParams({});
    }
  };

  // delete user
  const removeUser = (id) => {
    dispatch(loadingAction());
    deleteUser(`admin/${id}`)
      .then(() => {
        getAllUsers(`admin?sort=${type},${sort}`)
          .then((data) => {
            dispatch(allUsersAction(data.data));
            dispatch(notLoadingAction());
            setModal(false);
          });
      });
  };

  return (
    <div className="container">
      {loading ?
        <Loading/> :
        <>
          <Search searchTerm={searchTerm} handleSearch={handleSearch}/>

          <Table className="user-list" striped bordered hover>
            <thead>
              <tr>
                <th>id
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('id')}
                    >
                    </span>
                  </button>
                </th>
                <th>username
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('userName')}
                    >
                    </span>
                  </button>
                </th>
                <th>e-mail
                  <button className="btn">
                    <span
                      className="icon icon-arrow"
                      onClick={() => handleSort('email')}
                    >
                    </span>
                  </button>
                </th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>{searchUsers.length ?
              (rowsPerPage > 0 ?
                searchUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                searchUsers).map((user) =>
                <UserItem
                  removeUser={removeUser}
                  user={user}
                  key={user.id}
                  visible={modal}
                  setVisible={setModal}
                />) :
              <tr className="no-users">
                <td colSpan="4">No Users!</td>
              </tr>
            }
            </tbody>
          </Table>

          <TablePaginationDemo
            users={searchUsers}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={+page}
            rowsPerPage={+rowsPerPage}
          />
        </>
      }
    </div>
  );
};

export default UserList;
