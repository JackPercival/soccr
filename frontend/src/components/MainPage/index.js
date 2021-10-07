import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainPage.css';

function MainPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(1);

  const images = {
      1: {
        url: 'https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg',
        title: "Camp Nou, Barcelona",
        author: "Jack Percival"
      },
      2: {
        url: 'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Feverythingbarca.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F1232931689.jpeg',
        title: "The GOAT",
        author: "Senor Messi"
      },
      3: {
        url: 'https://e0.365dm.com/21/01/1600x900/skysports-france-fifa-world-cup_5245366.jpg?20210920080343',
        title: "Champions du Monde",
        author: "FIFA"
      },
  }

//   useEffect(() => {
//       const interval = setInterval(() => {
//         if (currentImage !== 3) {
//             setCurrentImage(prevVal => prevVal + 1);
//         } else {
//             setCurrentImage(1);
//         }
//       }, 3000)

//       return () => clearInterval(interval)
//   }, [currentImage])

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
        </footer>
    </div>
  );
}

export default MainPage;
