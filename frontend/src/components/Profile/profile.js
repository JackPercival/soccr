import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import { getAllImages } from '../../store/images';
import { loadUsers } from '../../store/users';

import './profile.css'

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId } = useParams();
    const userPage = useSelector(state => state.users[userId])
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => Object.values(state.images).filter(image => image.user_id === Number(userId)));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(getAllImages()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    useEffect(() => {
        document.title = "You | Soccr";
    }, []);

    if (isLoaded && !userPage) {
        history.push('/explore')
    }

    return (
        <div className="container">
            <Header />
            <main>
                <div className="exploreHeader">
                    <h1>Your Photos</h1>
                </div>
            {!isLoaded && (
                <div className="loadingContainer">
                    <h3>Loading Images</h3>
                    <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                </div>
            )}
            {isLoaded && (
                <ul className="imagesContainer">
                    {images?.map(image => {
                        if (image.id) {
                            return <ImageHolder key={`image_${image.id}`} image={image} />
                        } else {
                            return null;
                        }
                    })}
                </ul>
            )}
            </main>
            <Footer />
        </div>
    )

}

export default Profile;
