import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import { AiFillGithub,AiFillLinkedin, AiOutlineSearch } from 'react-icons/ai'
import CreateBusinessModal from './HomePage/createBusinessModal';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar-container">
      <NavLink to='/' className="nav-buttons" exact={true} activeClassName='active'>
        <img className='logo' src='https://i.imgur.com/Q5G3Jlo.png'/>
      </NavLink>
      <div id='footer-container'>
            <div className="each">
                <a className="feet" href="https://github.com/Christian-AC">
                   Made by: Christian Alcantara <AiFillGithub className="githubby" href="https://github.com/Christian-AC" />
                </a>
                <a className="feet" href="https://www.linkedin.com/in/christian-alcantara-cayanan/">
                    <AiFillLinkedin href="https://www.linkedin.com/in/christian-alcantara-cayanan/"/>
                </a>
            </div>
      </div>
      {sessionUser && (
        <div className="navbar-button-container" >
          {/* <NavLink to='/business' exact={true} activeClassName='active'>
            <button className="Browse-Button">Browse Businesses</button>
          // </NavLink> */}
          <CreateBusinessModal/>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
