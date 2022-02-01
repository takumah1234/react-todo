/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authContext';

function PrivateRoute(): React.ReactElement {
  const user = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
