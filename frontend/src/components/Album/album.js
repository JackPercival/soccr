import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './album.css';

function Album({user, loggedInUser}) {

    const [showCreateAlbum, setShowCreateAlbum] = useState(false)

    return (
        <>
            {!showCreateAlbum && (
                <div className="noImages">
                    <h3>Let's make an album.</h3>
                    <h4>Easily organize all your photos into beautiful albums to share with friends, family, or even other Soccr members.</h4>
                    <div className="uploadPhotoLink" onClick={() => setShowCreateAlbum(true)}>Create Album</div>
                </div>
            )}
        </>
    )
}

export default Album;
