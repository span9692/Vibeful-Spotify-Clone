
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import { logout } from '../../store/session';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const guestSplash = (
    <>
      <nav>
        <div class="header"></div>
        <NavLink to="/home" exact={true} activeClassName="active">
        <img alt="logo" className="logo" src="https://cdn.discordapp.com/attachments/917541871457275925/917759128548569098/vibe_icon.png" />
        </NavLink>
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
    <nav className="dashboardDisappear">
      <div class="header"></div>
      <NavLink to="/home" exact={true} activeClassName="active">
        <img
          alt="logo"
          className="logo"
          src="https://cdn.discordapp.com/attachments/917541871457275925/917759128548569098/vibe_icon.png"
        />
      </NavLink>
      <NavLink
        to="/home"
        exact={true}
        activeClassName="active"
        className="homeLink"
      >
        Home
      </NavLink>
      <a href onClick={onLogout}
        exact={true}
        activeClassName="active"
        className="loginLink"
      >
        Logout
      </a>
    </nav>
  );

  return (
    <>
      { user ? userSplash : guestSplash }
    </>
  );
}

export default NavBar;
