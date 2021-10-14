import { useState } from 'react';

function UploadAlbumImageHolder({image}) {
    const [hovered, setHovered] = useState('');
    const [border, setBorder] = useState('No');

    const toggleInfo = () => {
        if (hovered === 'imageHovered') {
            setHovered('')
        } else {
            setHovered('imageHovered')
        }
    }

    const toggleBorder = () => {
        if (border === "Yes") {
            setBorder('No')
        } else {
            setBorder("Yes")
        }
    }

    return (
        <li className="imageExploreContainer" id={hovered}
            onMouseOver={toggleInfo}
            onMouseOut={toggleInfo}
            onClick={toggleBorder}>
                <img className="imagesExplore" src={image.image_url} id={`${border}_border`} alt={image.title} loading="lazy"/>
                <p className="imageTitle">{image.title}</p>
        </li>
    )
}

export default UploadAlbumImageHolder;