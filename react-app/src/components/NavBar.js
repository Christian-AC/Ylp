
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-container">
      <ul>
        {!sessionUser && (
        <>
        <li className="nav-buttons">
          <NavLink className="nav-buttons" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' className="nav-buttons" exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        </>)}
      {sessionUser && (
        <>
        <li>
          <NavLink to='/' className="nav-buttons" exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/business' className="nav-buttons" exact={true} activeClassName='active'>
            Business List
          </NavLink>
        </li>
        <li>
          <NavLink to='/business/create' className="nav-buttons" exact={true} activeClassName='active'>
            Create
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        </>
      )}
      </ul>
    </nav>
  );
}

export default NavBar;
