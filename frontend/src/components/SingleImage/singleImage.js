import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useSelector, useDispatch } from 'react-redux';

import { getAllImages } from '../../store/images';

function SingleImage() {
    const { imageId } = useParams();
    
    const image = useSelector(state => state.images[imageId]);
    console.log(image)

    return (
        <div className="container">
            <Header />
            <main>
                <div className="imageDisplay">

                </div>
                <div className="imageDetails">

                </div>
                <h1>Review Section {image?.title}</h1>
            </main>
            <Footer />
        </div>
    )
}

export default SingleImage;
