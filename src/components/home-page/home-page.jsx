import React from 'react';
import Login from '../login/login';

const HomePage = () => {
  const userLogin = localStorage.getItem('accessToken');

  return (
    <>
      {
        !userLogin ? <Login/> : <div></div>
      }
    </>
  );
};

export default HomePage;
