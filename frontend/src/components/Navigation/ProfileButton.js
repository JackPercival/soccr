import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div onClick={openMenu} id="profButtonDiv">
        <i className="fas fa-user-circle" id="profileButton"/>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <p id="helloUser">Hello, {user.username}!</p>
          <div onClick={logout} id="logOutButton">Log Out</div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
