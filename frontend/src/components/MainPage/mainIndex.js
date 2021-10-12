import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader/mainHeader';
import ExplorePage from '../Explore/explore';
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
    document.title = "Explore | Soccr";

    return (
      <ExplorePage />
    )
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
                <h4>{images[currentImage].title}</h4>
                <h4>by {images[currentImage].author}</h4>
            </div>
        </main>
        <div className="main-image" style={{backgroundImage: `url(${images[currentImage].url})`}}></div>
        <Footer />
    </div>
  );
}

export default MainPage;
