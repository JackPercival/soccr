import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './header.css'

function Header() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [search, setSearch] = useState('');

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <header id="normalHeader">
            <NavLink to="/" className="mainLink" id="normalLogo">
                <div id="logoContents">
                    <div className="logoCircle" id="blueCircle"></div>
                    <div className="logoCircle" id="redCircle"></div>
                    <div id="soccrLogo">soccr</div>
                </div>
            </NavLink>
            {sessionUser && (
                <div className="headerLink">
                    <NavLink to="/you">You</NavLink>
                </div>
            )}
            <div className="headerLink">
                <NavLink to="/explore">Explore</NavLink>
            </div>
            <div id="searchContainer">
                    <form id="searchForm">
                        <button id="searchButton">
                            <div>
                                <i className="fas fa-search"></i>
                            </div>
                        </button>
                        <input
                            id="searchBar"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Photos, people, or groups"
                        />
                    </form>
            </div>
            {!sessionUser && (
                <div id="userButtons">
                    <div id="loginButton" className="headerLink">
                        <NavLink to="/login">Log In</NavLink>
                    </div>
                    <div>
                        <NavLink className="signUpButton" id="normalSignUp" to="/signup"><p>Sign Up</p></NavLink>
                    </div>
                </div>)}
            {sessionUser && (
                <div id="userButtons">
                    <div className="headerLink">
                        <p id="logoutButton" onClick={logout}>Log Out</p>
                    </div>
                    <div>
                        <NavLink className="signUpButton" id="normalSignUp" to="/signup"><p>Sign Up</p></NavLink>
                    </div>
                </div>)}
      </header>
    )
}

export default Header;
