
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user);

  const guestSplash = (
    <>
      <nav>
        <div class="header"></div>
        <NavLink to="/home" exact={true} activeClassName="active" className="homeLink">
          Home
        </NavLink>
        <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
        <label for="openSidebarMenu" class="signupLink">
          Signup
        </label>
        <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
        <label for="openSidebarMenu" class="loginLink">
          Login
        </label>

        <div id="sidebarMenu">
            <LoginForm />
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
