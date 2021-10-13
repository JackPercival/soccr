import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import { getAllImages } from '../../store/images';
import { loadUsers, updateProfilePic } from '../../store/users';
import { restoreUser } from '../../store/session';

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
        if (user) {
            document.title = `${user?.username} | Soccr`;
        }
    }, [user]);

    if (isLoaded && !user) {
        history.push('/explore')
    }

    const handleCancel = () => {
        setShowChangePic(false);
        setProfileUrl('');
    }

    const handleProfilePictureUpdate = async (e) => {
        e.preventDefault();

        const payload= {
            id: Number(userId),
            profile_pic: profile_url
        }

        const updatedProfPic = await dispatch(updateProfilePic(payload))


        if (!updatedProfPic) {
            alert("An error occured. Please refresh the page and try again.");
        }

        //This resets the icon in the header
        dispatch(restoreUser())

        setShowChangePic(false);
        setProfileUrl('');
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
                                                placeholder="Add a URL"
                                                value={profile_url}
                                                onChange={(e) => setProfileUrl(e.target.value)}
                                            />
                                            <div className="updatePicButtons">
                                                <button onClick={handleProfilePictureUpdate}>Update</button>
                                                <button id="cancelUpdate"onClick={handleCancel}>Cancel</button>
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
                            {images?.length > 0 && images?.map(image => {
                                if (image.id) {
                                    return <ImageHolder key={`image_${image.id}`} image={image} />
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                        {images?.length === 0 && user?.id === sessionUser?.id && (
                            <div className="noImages">
                                <h3>Don't forget to upload your photos.</h3>
                                <h4>Your photostream is your public-facing portfolio. Upload photos to populate your photostream.</h4>
                                <Link to="/upload">
                                    <div className="uploadPhotoLink">Upload Photos</div>
                                </Link>
                            </div>
                        )}
                        {images?.length === 0 && user?.id !== sessionUser?.id && (
                            <div className="noImages">
                            <h3>{`${user?.username} hasn't made any photos public yet.`}</h3>
                        </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    )

}

export default Profile;
