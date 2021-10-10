import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './mainHeader.css'

function MainHeader() {
    const [search, setSearch] = useState('');

    return (
        <header id="mainHeader">
            <NavLink to="/" className="mainLink" id="mainLogo">
                <div id="logoContents">
                    <div className="logoCircle" id="blueCircle"></div>
                    <div className="logoCircle" id="redCircle"></div>
                    <div id="soccrLogo">soccr</div>
                </div>
            </NavLink>
            <div className="searchContainer">
                <form id="searchForm" autoComplete="off">
                    <button id="searchButton">
                        <div>
                            <i className="fas fa-search"></i>
                        </div>
                    </button>
                    <input
                        className="searchBar"
                        type="text"
                        value={search}
                        autoComplete="off"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Photos, people, or groups"
                    />
                </form>
            </div>
            <div id="userButtons">
                <div className="headerLink" id="loginButton">
                    <NavLink to="/login">Log In</NavLink>
                </div>
                <div>
                    <NavLink className="signUpButton" to="/signup"><p>Sign Up</p></NavLink>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;
