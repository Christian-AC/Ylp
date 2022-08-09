import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    history.push('/')
  };
  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
