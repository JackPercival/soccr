import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import EditProfPic from '../EditProfPic/editProfPic';
import ImageHolder from '../ImageHolder/imageHolder';
import Album from '../Album/album';

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
    const [showAlbum, setShowAlbum] = useState(false)

    useEffect(() => {
        dispatch(loadUsers())
        .then(dispatch(getAllImages()))
        .then(() => setIsLoaded(true));

        return () => {
            setIsLoaded();

        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            document.title = `${user?.username} | Soccr`;
        }
    }, [user]);

    //Redirect if the user does not exist
    useEffect(() => {
        if (isLoaded && !user) {
            history.push('/explore')
        }
    })

    //This is to avoid the scroll bar affecting the width of the page when you toggle between Photostream and Albums
    //Now there will always be space for the scrollbar, even if there is no scroll bar visible
    useEffect(() => {
        document.body.style.overflowY = 'scroll';

        return () => {
            document.body.style.overflowY = 'visible';
        }
    })


    return (
        <div className="container" id="mainProfileContainer">
            <Header />
            <main className="mainProfile">
                {!isLoaded && (
                    <div className="loadingContainer">
                        <h3>Loading Page</h3>
                        <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                    </div>
                )}
                {isLoaded && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${user?.banner_pic? user.banner_pic : 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634328943/soccr/banner_wlerfs.jpg'})`}}>
                            <div className="profilePageDetails">
                                {user?.profile_pic? (
                                    <div className="profileDetailIcon" style={{backgroundImage: `url(${user.profile_pic})`}}></div>
                                ): (
                                    <div id="defaultIcon">
                                        <i className="fas fa-user-circle" id="profileButton"/>
                                    </div>
                                )}
                                <div className="userNameAndButton">
                                    <h1>{user?.username}</h1>
                                    {user?.id === sessionUser?.id && (
                                        <EditProfPic user={user} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="navHeaderContainer">
                            <div className="navHeader">
                                <div className="exploreHeader profileNav">
                                    <h3 id={!showAlbum? 'keepUnderline' : null} onClick={() => setShowAlbum(false)}>Photostream</h3>
                                    <h3 id={showAlbum? 'keepUnderline' : null} onClick={() => setShowAlbum(true)}>Albums</h3>
                                </div>
                            </div>
                        </div>
                        {!showAlbum && (
                            <>
                                {images?.length > 0 && (
                                    <ul className="imagesContainer">
                                        {images?.map(image => {
                                                if (image.id) {
                                                    return <ImageHolder key={`image_${image.id}`} image={image} />
                                                } else {
                                                    return null;
                                                }
                                            }
                                        )}
                                        <li id="emptyLi"></li>
                                    </ul>
                                )}
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
                        {showAlbum && (
                            <Album user={user} loggedInUser={user?.id === sessionUser?.id}/>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    )

}

export default Profile;
