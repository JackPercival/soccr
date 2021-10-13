import { useState } from 'react';
import { Link } from 'react-router-dom';
import './imageHolder.css'

function ImageHolder({image}) {
    // console.log("********", image.User)
    const [hovered, setHovered] = useState('');

    const toggleInfo = () => {
        if (hovered === 'imageHovered') {
            setHovered('')
        } else {
            setHovered('imageHovered')
        }
    }

    return (
        <li className="imageExploreContainer" id={hovered}
            onMouseOver={toggleInfo}
            onMouseOut={toggleInfo}>
            <Link to={`/images/${image.id}`}>
                <img className="imagesExplore" src={image.image_url} alt={image.title} loading="lazy"/>
                <p className="imageTitle">{image.title}</p>
                <Link to={`/people/${image.user_id}`}>
                    <p className="imageAuthor">{image.User? image.User.username: null}</p>
                </Link>
            </Link>
        </li>
    )
}

export default ImageHolder;
