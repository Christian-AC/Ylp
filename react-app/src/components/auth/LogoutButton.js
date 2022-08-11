import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    history.push('/')
  };
  return <button className="Logout-Button" onClick={onLogout}> Logout <BiLogOut/> </button>
};

export default LogoutButton;
