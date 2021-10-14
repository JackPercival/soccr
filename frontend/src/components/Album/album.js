import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadAlbums } from '../../store/albums';
import { loadAlbumContents } from '../../store/albumContents';

import AlbumHolder from '../AlbumHolder/albumHolder';

import './album.css';

function Album({user, loggedInUser}) {
    const dispatch = useDispatch();

    const albums = useSelector(state => Object.values(state.albums).filter(albums => albums.user_id === user?.id));

    const [showCreateAlbum, setShowCreateAlbum] = useState(false);
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
                    {albums.length > 0 && !showCreateAlbum && (
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
                    {/* No albums case, for logged in and non logged in user */}
                    {albums.length === 0 && !showCreateAlbum && (
                        <>
                            {loggedInUser? (
                                <div className="noImages">
                                    <h3>Let's make an album.</h3>
                                    <h4>Easily organize all your photos into beautiful albums to share with friends, family, or even other Soccr members.</h4>
                                    <div className="uploadPhotoLink" onClick={() => setShowCreateAlbum(true)}>Create Album</div>
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
