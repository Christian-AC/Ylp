import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import { GrHome } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { FiLogOut } from "react-icons/gr";
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-container">
        {!sessionUser && (
        <>
          <NavLink className="nav-buttons" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' className="nav-buttons" exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </>)}
      {sessionUser && (
        <>
          <NavLink to='/' className="nav-buttons" exact={true} activeClassName='active'>
            <GrHome className='home-button' />
          </NavLink>

          <NavLink to='/business' className="nav-buttons" exact={true} activeClassName='active'>
            Business List
          </NavLink>

          <NavLink to='/business/create' className="nav-buttons" exact={true} activeClassName='active'>
          <IoMdCreate/> Create Business
          </NavLink>
          <LogoutButton />
        </>
      )}
    </nav>
  );
}

export default NavBar;
