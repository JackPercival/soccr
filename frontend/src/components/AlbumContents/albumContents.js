import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadAlbums } from '../../store/albums';
import { loadAlbumContents } from '../../store/albumContents';

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

    const [isLoaded, setIsLoaded] = useState(false);

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

    //Redirect if the image does not exist
    useEffect(() => {
        if (isLoaded && !album) {
            history.push('/explore')
        }
    })

    return (
        <div className="container">
            <Header />
            <main className="mainSingleImage">
                <div className="exploreHeader">
                    <h1>{album?.title}</h1>
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
