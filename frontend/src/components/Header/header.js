import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './header.css'

function Header() {
    // const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [search, setSearch] = useState('');

    const [searchFocus, setSearchFocus] = useState('');

    const handleFocus = () => {
        if (search.length === 0) {
            setSearchFocus('');
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const searchParameters = search;
        const cleanedSearch = encodeURIComponent(searchParameters);

        history.push(`/search/${cleanedSearch}`);
        setSearch('');
    }

    //Avoid annoying page reloads causing the scroll bar to re-adjust width of page
    //Which casuses things to re-shift
    document.body.style.overflowY = 'scroll';

    return (
        <header id="normalHeader">
            <div className="leftHeader">
                <NavLink to="/" className="mainLink" id="normalLogo">
                    <div id="logoContents">
                        <div className="logoCircle" id="blueCircle"></div>
                        <div className="logoCircle" id="redCircle"></div>
                        <div id="soccrLogo">soccr</div>
                    </div>
                </NavLink>
                {sessionUser && (
                    <div className="headerLink">
                        <NavLink to={`/people/${sessionUser?.id}`} id="youLink">You</NavLink>
                    </div>
                )}
                <div className="headerLink">
                    <NavLink to="/explore">Explore</NavLink>
                </div>
            </div>
            <div className="rightHeader">
                <div className={`normalSearchContainer ${searchFocus}`}>
                        <form id="searchForm" autoComplete="off" onSubmit={handleSearchSubmit}>
                            <button id="searchButton">
                                <div>
                                    <i className="fas fa-search"></i>
                                </div>
                            </button>
                            <input
                                className={`normalSearchBar ${searchFocus}`}
                                id="normalSearchBar"
                                type="text"
                                value={search}
                                autoComplete="off"
                                placeholder="Photos, people, or groups"
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setSearchFocus('searchInputFocus')}
                                onBlur={handleFocus}
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
                    <div className="loggedInButtons">
                        <NavLink to="/upload">
                            <div className="uploadIcon" title="Upload">
                                <i className="fas fa-cloud-upload-alt"></i>
                            </div>
                        </NavLink>
                        <ProfileButton user={sessionUser}/>
                    </div>)}
            </div>
      </header>
    )
}

export default Header;
