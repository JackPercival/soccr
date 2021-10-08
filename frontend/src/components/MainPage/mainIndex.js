import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { useSelector } from 'react-redux';
import './MainPage.css';

function MainPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(1);

  const images = {
      1: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/soccerSunset_qtvwk2.jpg',
        title: "Sunset Stadium",
        author: "Pascal Müller"
      },
      2: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/night_rkarsr.jpg',
        title: "Soccer at night",
        author: "Abigail Keenan"
      },
      3: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/personPlaying_mlgfsm.jpg',
        title: "Dribble",
        author: "Jannik Skorna"
      },
      4: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/goalLine_wprlza.jpg',
        title: "Goal Line",
        author: "Nathan Rogers"
      },
      5: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/groupama_gkihoy.jpg',
        title: "Groupama Stadium",
        author: "Thomas Serer"
      },
      6: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734638/soccr/flares_j2pqfh.jpg',
        title: "Fans with Flares",
        author: "Alexandre Brondino"
      },
      7: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/freeKick_oocmzn.jpg',
        title: "Free kick",
        author: "Omar Ram"
      },
      8: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734638/soccr/moreThan_s4lygy.jpg',
        title: "More than a club",
        author: "Edgar Chaparro"
      },
      9: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/goal_ceeamz.jpg',
        title: "Goal!",
        author: "Joshua Hoehne"
      },
      10: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/silhouette_inzqi2.jpg',
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
      }, 10000)

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
        <main>
            <div id="mainText">
                <h1 id="findInsp">Find your inspiration.</h1>
                <h2 id="join">Join the Soccr community, home to tens of billions of photos and 2 million groups.</h2>
                <Link id="startFree" to="/signup">Start for free</Link>
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
