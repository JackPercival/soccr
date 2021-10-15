import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadAlbums } from '../../store/albums';
import { loadAlbumContents } from '../../store/albumContents';

import AlbumHolder from '../AlbumHolder/albumHolder';

import './album.css';

function Album({user, loggedInUser}) {
    const dispatch = useDispatch();

    const albums = useSelector(state => Object.values(state.albums).filter(albums => albums.user_id === user?.id));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadAlbums())
        dispatch(loadAlbumContents()).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }
    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <>
                    {albums.length > 0 && (
                        <div className="userAlbumsDisplay">
                        {albums?.map(album => {
                                if (album.id) {
                                    return <AlbumHolder key={album.id} album={album}/>
                                } else {
                                    return null;
                                }
                            }
                        )}
                        </div>
                    )}
                    {loggedInUser && albums.length > 0 && (
                        <div className="uploadAlbumButtonContainer">
                            <Link to="/create-album">
                                <div className="uploadPhotoLink" id="uploadAlbumButton">Create New Album</div>
                            </Link>
                        </div>
                    )}

                    {/* No albums case, for logged in and non logged in user */}
                    {albums.length === 0 && (
                        <>
                            {loggedInUser? (
                                <div className="noImages">
                                    <h3>Let's make an album.</h3>
                                    <h4>Easily organize all your photos into beautiful albums to share with friends, family, or even other Soccr members.</h4>
                                    <Link to="/create-album">
                                        <div className="uploadPhotoLink">Create Album</div>
                                    </Link>
                                </div>
                            ):
                            (
                                <div className="noImages">
                                    <h3>{`As soon as ${user.username} puts the camera down, we may have an album to view.`}</h3>
                                </div>
                            )
                            }
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Album;
