import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainPage.css';

function MainPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(4);

  const images = {
      1: {
        url: 'https://images.unsplash.com/photo-1624252972128-31c39d18cb9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80',
        title: "Save in motion",
        author: "JPrapoth Panchuea"
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

  }

  useEffect(() => {
      const interval = setInterval(() => {
        if (currentImage !== 5) {
            setCurrentImage(prevVal => prevVal + 1);
        } else {
            setCurrentImage(1);
        }
      }, 8000)

      return () => clearInterval(interval)
  }, [currentImage])

  let sessionLinks;
  //If there is a session user, add a component to the main layout page of a logged in user
//   if (sessionUser) {
//     //

//     //Else show them the cool layout page
//   } else {
//     sessionLinks = (
//       <>
//         <NavLink to="/login">Log In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </>
//     );
//   }

  return (
    <div className="container">
        <header>
            <NavLink to="/main" id="mainLink">
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
                    <NavLink to="/signup">Start for free</NavLink>
                </div>
            </div>
            <div id="pic-info">
                <h4>{images[currentImage].title}</h4>
                <h4>by {images[currentImage].author}</h4>
            </div>
        </main>
            <div id="main-image" style={{backgroundImage: `url(${images[currentImage].url})`}}></div>
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
