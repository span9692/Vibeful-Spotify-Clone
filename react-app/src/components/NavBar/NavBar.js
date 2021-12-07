
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user);

  const guestSplash = (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo">
          </div>
          <div className="link">
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </div>
          <div classNAme="link">
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
          </div>
          <div className="link">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );

  const userSplash = (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
          <li>
          <LogoutButton />
          </li>
        </ul>
      </nav>
      <h1>You are logged in!</h1>
    </>
  );

  return (
    <>
      { user ? userSplash : guestSplash }
    </>
  );
}

export default NavBar;
