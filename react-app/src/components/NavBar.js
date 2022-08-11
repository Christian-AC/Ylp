import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import { GrHome } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { FiLogOut } from "react-icons/gr";
import CreateBusinessModal from './HomePage/createBusinessModal';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar-container">
      <NavLink to='/' className="nav-buttons" exact={true} activeClassName='active'>
        <img className='logo' src='https://i.imgur.com/Q5G3Jlo.png'/>
      </NavLink>
      {sessionUser && (
        <div >
          <CreateBusinessModal/>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
