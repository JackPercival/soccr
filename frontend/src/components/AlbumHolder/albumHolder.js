import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './albumHolder.css';

function AlbumHolder({ album }) {

    return (
        <h1>{album.title}</h1>
    )
}
export default AlbumHolder;

//Write albumcontents- route, store, thunk, then dispatch on load
//Make the backend route only find albums contents for the specific album_id
