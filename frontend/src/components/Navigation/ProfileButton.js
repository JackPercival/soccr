import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  function getRandom() {
    return Math.floor(Math.random() * 10) + 1;
  }

  const [languageVal, setLanguageVal] = useState(getRandom())

  const language = {
    1: {
      hello: "Hola",
      language: "Spanish"
    },
    2: {
      hello: "Bonjour",
      language: "French"
    },
    3: {
      hello: "Hello",
      language: "English"
    },
    4: {
      hello: "Kon'nichiwa",
      language: "Japanese"
    },
    5: {
      hello: "Hei",
      language: "Finnish"
    },
    6: {
      hello: "Hallå",
      language: "Swedish"
    },
    7: {
      hello: "Ciao",
      language: "Italian"
    },
    8: {
      hello: "Hej",
      language: "Danish"
    },
    9: {
      hello: "Nǐ hǎo",
      language: "Chinese"
    },
    10: {
      hello: "Ahoj",
      language: "Czech"
    },
    11: {
      hello: "Privet",
      language: "Russian"
    }
  }

  const openMenu = () => {
    if (showMenu) return;

    while (true) {
      const number = getRandom();
      if (number !== languageVal) {
        setLanguageVal(number);
        break;
      }
    }
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

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <div onClick={openMenu} id="profButtonDiv">
        <i className="fas fa-user-circle" id="profileButton"/>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div id="triangle"></div>
          <p id="helloUser">{language[languageVal].hello}, {user.username}!</p>
          <p id="language">Now you know how to greet people in {language[languageVal].language}</p>
          <div onClick={logout} id="logOutButton">Log Out</div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
