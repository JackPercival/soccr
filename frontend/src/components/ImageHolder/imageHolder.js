import { NavLink, Link } from 'react-router-dom';
import './imageHolder.css'

function ImageHolder({image}) {
    console.log("********", image.User)
    return (
        <NavLink to={`/images/${image.id}`}>
            <div className="imageExploreContainer">
                <img className="imagesExplore" src={image.image_url} alt={image.title}/>
            </div>
        {image.title}
        {/* {image.User.username} */}
        </NavLink>
    )
}

export default ImageHolder;
