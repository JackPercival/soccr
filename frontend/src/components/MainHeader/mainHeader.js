import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './mainHeader.css'

function MainHeader() {
    const [search, setSearch] = useState('');

    return (
        <header>
            <NavLink to="/" id="mainLink">
                <div id="logoContents">
                    <div className="logoCircle" id="blueCircle"></div>
                    <div className="logoCircle" id="redCircle"></div>
                    <div id="soccrLogo">soccr</div>
                </div>
            </NavLink>
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
            <div id="userButtons">
                <div id="loginButton">
                    <NavLink to="/login">Log In</NavLink>
                </div>
                <div>
                    <NavLink id="signUpButton" to="/signup"><p>Sign Up</p></NavLink>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;
