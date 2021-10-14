import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './albumHolder.css';

function AlbumHolder({ album }) {

    const albumContents = useSelector(state => Object.values(state.albumContents).filter(contents => contents.album_id === album.id));

    return (
        <Link to={`/albums/${album.id}`}>
            <div className="singleAlbum" style={{backgroundImage: `url(${albumContents[0].Image.image_url})`}}>
                <h4>{album.title}</h4>
                <h5>{`${albumContents.length} ${albumContents.length > 1? 'photos' : 'photo'}`}</h5>
            </div>
        </Link>
    )
}
export default AlbumHolder;
