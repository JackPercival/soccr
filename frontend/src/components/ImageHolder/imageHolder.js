import { useState } from 'react';
import { Link } from 'react-router-dom';
import './imageHolder.css'

function ImageHolder({image}) {
    console.log("********", image.User)
    const [hovered, setHovered] = useState('');

    const toggleInfo = () => {
        if (hovered === 'imageHovered') {
            setHovered('')
        } else {
            setHovered('imageHovered')
        }
    }

    return (
        <Link to={`/images/${image.id}`}>
            <div className="imageExploreContainer" id={hovered}
                onMouseOver={toggleInfo}
                onMouseOut={toggleInfo}>
                <img className="imagesExplore" src={image.image_url} alt={image.title}/>
                <p className="imageTitle">{image.title}</p>
                <p className="imageAuthor">{image.User? image.User.username: null}</p>
            </div>
        </Link>
    )
}

export default ImageHolder;