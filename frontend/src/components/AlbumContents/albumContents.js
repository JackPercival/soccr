import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadAlbumContents } from '../../store/albumContents';
import { loadAlbums, deleteSingleAlbum,  } from '../../store/albums';

import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import './albumContents.css'

function AlbumContents() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { albumId } = useParams();

    const albumContents = useSelector(state => Object.values(state.albumContents).filter(contents => contents?.album_id === Number(albumId)));
    const album = useSelector(state => state.albums[albumId]);
    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(loadAlbums())
        dispatch(loadAlbumContents()).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }
    }, [dispatch]);

    useEffect(() => {
        document.title = `${album?.title} | Soccr`;
    }, [album?.title]);

    //Redirect if the album does not exist
    useEffect(() => {
        if (isLoaded && !album) {
            history.push('/explore')
        }
    })

    const deleteAlbum = async (e) => {
        e.preventDefault();

        const wasDeleted = await dispatch(deleteSingleAlbum({albumId}))

        if (!wasDeleted) {
            alert("An error occured. Please refresh the page and try again.");
        }
    }

    return (
        <div className="container">
            <Header />
            <main className="mainSingleImage">
                <div className="exploreHeader" id="albumHeader">
                    <h1>{album?.title}</h1>
                    {isLoaded && album?.user_id === sessionUser?.id && (
                        <div className="editAlbumOnAlbumPageButtons">
                            <Link to={`/albums/${album.id}/edit`}>
                                <div
                                    id="editAlbumOnAlbumPage"
                                    title="Edit Album"
                                >
                                    <i className="fas fa-edit"></i>
                                </div>
                            </Link>
                            <div
                                id="deleteAlbumOnAlbumPage"
                                title="Delete Album"
                                onClick={() => setShowDelete(true)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    )}
                    {showDelete && (
                        <div className="deleteAlbumPopUp">
                            <div className="confirmDeleteAlbum" onClick={deleteAlbum}>Confirm Album Deletion </div>
                            <div className="cancelDeleteAlbum" onClick={() => setShowDelete(false)}>Cancel</div>
                        </div>
                    )}
                </div>
            {!isLoaded && (
                <div className="loadingContainer">
                    <h3>Loading Images</h3>
                    <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                </div>
            )}

            {isLoaded && (
                <ul className="imagesContainer">
                    {albumContents?.map(image => {
                        if (image.id) {
                            return <ImageHolder key={`albumImage_${image.id}`} image={image.Image} />
                        } else {
                            return null;
                        }
                    })}
                    <li id="emptyLi"></li>
                </ul>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default AlbumContents;
