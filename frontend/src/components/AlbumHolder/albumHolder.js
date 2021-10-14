import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSingleAlbum,  } from '../../store/albums';

import './albumHolder.css';

function AlbumHolder({ album }) {

    const sessionUser = useSelector(state => state.session.user);
    const albumContents = useSelector(state => Object.values(state.albumContents).filter(contents => contents.album_id === album.id));

    return (
        <Link to={`/albums/${album.id}`}>
            {albumContents[0]? (
                <div className="singleAlbum" style={{backgroundImage: `url(${albumContents[0].Image.image_url})`}}>
                    <h4>{album.title}</h4>
                    <h5>{`${albumContents.length} ${albumContents.length > 1? 'photos' : 'photo'}`}</h5>
                    {album.user_id === sessionUser.id && (
                    <div className="editAlbumButtons">
                        <div
                        // id={showButton}
                            title="Edit Album"
                            // onClick={() => setShowEditCommentForm(true)}
                        >
                            <i className="fas fa-edit"></i>
                        </div>
                        <div
                        // id={showButton}
                            title="Delete Album"
                            // onClick={displayDeleteButtons}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </div>
                    </div>
                    )}
                </div>
            ) : (
                <div className="singleAlbum" id="noImagesInAlbum">
                    <h4>{album.title}</h4>
                    <h5>No photos in album</h5>
                    {album.user_id === sessionUser.id && (
                    <div className="editAlbumButtons">
                        <div
                        // id={showButton}
                            title="Edit Album"
                            // onClick={() => setShowEditCommentForm(true)}
                        >
                            <i className="fas fa-edit"></i>
                        </div>
                        <div
                        // id={showButton}
                            title="Delete Album"
                            // onClick={displayDeleteButtons}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </Link>
    )
}
export default AlbumHolder;
