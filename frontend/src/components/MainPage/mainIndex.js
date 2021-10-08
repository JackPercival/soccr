import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { useSelector } from 'react-redux';
import './MainPage.css';

function MainPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(8);

  const images = {
      1: {
        url: 'https://images.unsplash.com/photo-1540379708242-14a809bef941?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2060&q=80',
        title: "Soccer at Sunset",
        author: "Pascal Müller"
      },
      2: {
        url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
        title: "Person Playing",
        author: "Jannik Skorna"
      },
      3: {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
        title: "Groupama Stadium",
        author: "Thomas Serer"
      },
      4: {
        url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
        title: "Soccer at night",
        author: "Abigail Keenan"
      },
      5: {
        url: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        title: "Goal Line",
        author: "Nathan Rogers"
      },
      6: {
        url: 'https://images.unsplash.com/photo-1565099011766-1aa5ccfac7c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        title: "Fans with Flares",
        author: "Alexandre Brondino"
      },
      7: {
        url: 'https://images.unsplash.com/photo-1609869496575-c9c35de76498?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
        title: "Free kick",
        author: "Omar Ram"
      },
      8: {
        url: 'https://images.unsplash.com/photo-1521504846809-c3746c1fbf67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: "More than a club",
        author: "Edgar Chaparro"
      },
      9: {
        url: 'https://images.unsplash.com/photo-1605135693932-f1d6fb1be3cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1444&q=80',
        title: "Goal!",
        author: "Joshua Hoehne"
      },
      10: {
        url: 'https://images.unsplash.com/photo-1494177310973-4841f7d5a882?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80',
        title: "Silhouette goalkeeper catching the ball",
        author: "David Clarke"
      },

  }

  useEffect(() => {
      const interval = setInterval(() => {
        if (currentImage < 10) {
            setCurrentImage(prevVal => prevVal + 1);
        } else {
            setCurrentImage(1);
        }
      }, 8000)

      return () => clearInterval(interval)
  }, [currentImage])

  //If there is a session user, add a component to the main layout page of a logged in user
  if (sessionUser) {
    return (
      //Placeholder navigation component for now
      <Navigation isLoaded={isLoaded} />
    )
  }

  return (
    <div className="container">
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
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Photos, people, or groups"
                        id="searchBar"
                    />
                </form>
            </div>
            <div id="userButtons">
                <div id="loginButton">
                    <NavLink to="/login">Log In</NavLink>
                </div>
                <div id="signUpButton">
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </div>
        </header>
        <main>
            <div id="mainText">
                <h1 id="findInsp">Find your inspiration.</h1>
                <h2 id="join">Join the Soccr community, home to tens of billions of photos and 2 million groups.</h2>
                <div id="startFree">
                    <Link to="/signup">Start for free</Link>
                </div>
            </div>
            <div id="pic-info">
                <h4>{images[currentImage].title}</h4>
                <h4>by {images[currentImage].author}</h4>
            </div>
        </main>
        <div className="main-image" style={{backgroundImage: `url(${images[currentImage].url})`}}></div>
        <footer>
            <p>Developed by Jack Percival</p>
            <div id="devLinks">
                <a href="https://www.linkedin.com/in/jack-percival-900973a8/" target="_blank">
                    <div className="footer-icon">
                        <i className="fab fa-linkedin"></i>
                    </div>
                </a>
                <a href="https://github.com/JackPercival" target="_blank">
                    <div className="footer-icon">
                        <i className="fab fa-github"></i>
                    </div>
                </a>
            </div>
        </footer>
    </div>
  );
}

export default MainPage;
