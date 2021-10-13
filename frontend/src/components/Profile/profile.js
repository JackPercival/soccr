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
    const user = useSelector(state => state.users[userId])
    const sessionUser = useSelector(state => state.session.user);

    const images = useSelector(state => Object.values(state.images).filter(image => image.user_id === Number(userId)));
    const [isLoaded, setIsLoaded] = useState(false);
    const [showChangePic, setShowChangePic] = useState(false)
    const [profile_url, setProfileUrl] = useState('')

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(getAllImages()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    useEffect(() => {
        document.title = `${user?.username} | Soccr`;
    }, [user]);

    if (isLoaded && !user) {
        history.push('/explore')
    }

    return (
        <div className="container">
            <Header />
            <main>
                {!isLoaded && (
                    <div className="loadingContainer">
                        <h3>Loading Page</h3>
                        <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                    </div>
                )}
                {isLoaded && (
                    <>
                        <div className="profilePageDetails">
                            {user?.profile_pic? (
                                <div className="profileDetailIcon">
                                    <img src={user.profile_pic} alt="Profile"/>
                                </div>
                            ): (
                                <div className="profIcon">
                                    <i className="fas fa-user-circle" id="profileButton"/>
                                </div>
                            )}
                            <div className="userNameAndButton">
                                <h1>{user?.username}</h1>
                                {!showChangePic && user?.id === sessionUser?.id && (
                                    <div className="changeProfPic" onClick={() => setShowChangePic(true)}>Change Profile Picture</div>
                                )}
                                {showChangePic && user?.id === sessionUser?.id && (
                                    <div className="updatePicContainer">
                                        <form className="">
                                            <input
                                                className="profPicInput"
                                                placeholder="Profile Pic URL"
                                                value={profile_url}
                                                onChange={(e) => setProfileUrl(e.target.value)}
                                            />
                                            <div className="updatePicButtons">
                                                <button >Update</button>
                                                <button id="cancelUpdate"onClick={() => setShowChangePic(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    <div className="exploreHeader">
                        <h1>Photostream</h1>
                    </div>
                    <ul className="imagesContainer">
                        {images?.map(image => {
                            if (image.id) {
                                return <ImageHolder key={`image_${image.id}`} image={image} />
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )

}

export default Profile;
