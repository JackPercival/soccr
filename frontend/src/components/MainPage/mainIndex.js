import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MainHeader from '../MainHeader/mainHeader';
import Footer from '../Footer/footer';
import { useSelector } from 'react-redux';
import './MainPage.css';

function MainPage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [currentImage, setCurrentImage] = useState(1);

  const images = {
      1: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/soccerSunset_qtvwk2.jpg',
        title: "Sunset Stadium",
        author: "JackPercival",
        author_id: 2,
        image_id: 14,
      },
      2: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/night_rkarsr.jpg',
        title: "Soccer at night",
        author: "Soccer4Life",
        author_id: 4,
        image_id: 22,
      },
      3: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/personPlaying_mlgfsm.jpg',
        title: "Dribble",
        author: "JackPercival",
        author_id: 2,
        image_id: 26,
      },
      4: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/goalLine_wprlza.jpg',
        title: "Goal Line",
        author: "JuliaRose",
        author_id: 3,
        image_id: 10,
      },
      5: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/groupama_gkihoy.jpg',
        title: "Groupama Stadium",
        author: "JuliaRose",
        author_id: 3,
        image_id: 8,
      },
      6: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734638/soccr/flares_j2pqfh.jpg',
        title: "Fans with Flares",
        author: "JackPercival",
        author_id: 2,
        image_id: 24,
      },
      7: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/freeKick_oocmzn.jpg',
        title: "Free kick",
        author: "Soccer4Life",
        author_id: 4,
        image_id: 6,
      },
      8: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734638/soccr/moreThan_s4lygy.jpg',
        title: "More than a club",
        author: "Soccer4Life",
        author_id: 4,
        image_id: 19,
      },
      9: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/goal_ceeamz.jpg',
        title: "Goal!",
        author: "JuliaRose",
        author_id: 3,
        image_id: 12,
      },
      10: {
        url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633734639/soccr/silhouette_inzqi2.jpg',
        title: "Silhouette Goalkeeper",
        author: "Soccer4Life",
        author_id: 4,
        image_id: 15,
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


  //Hide scroll bar on this page
  useEffect(() => {
    document.body.style.overflowY = 'visible';

    return () => {
        document.body.style.overflowY = 'scroll';
    }
  })

  //If there is a session user, add a component to the main layout page of a logged in user
  if (sessionUser) {
    document.title = "Explore | Soccr";

    return <Redirect to="/explore" />;
  }

  document.title = "Find your inspiration. | Soccr";

  return (
    <div className="container">
        <MainHeader />
        <main id="mainContainer">
            <div id="mainText">
                <h1 id="findInsp">Find your inspiration.</h1>
                <h2 id="join">Join the Soccr community, home to tens of billions of photos and 2 million groups.</h2>
                <Link id="startFree" to="/signup">Start for free</Link>
            </div>
            <div id="pic-info">
                <Link to={`/images/${images[currentImage].image_id}`}>
                  <h4>{images[currentImage].title}</h4>
                </Link>
                <h4>by
                  <Link to={`/people/${images[currentImage].author_id}`}>{images[currentImage].author}</Link>
                </h4>
            </div>
        </main>
        <div className="main-image" style={{backgroundImage: `url(${images[currentImage].url})`}}></div>
        <Footer />
    </div>
  );
}

export default MainPage;
