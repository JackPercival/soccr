import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadAlbumContents } from '../../store/albumContents';

import './albumHolder.css';

function AlbumHolder({ album }) {
    const dispatch = useDispatch();

    const albumContents = useSelector(state => Object.values(state.albumContents));

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <h1>{album.title}</h1>
    )
}
export default AlbumHolder;
