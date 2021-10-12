import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import { getAllImages } from '../../store/images';

import './explore.css'


function ExplorePage() {
    const dispatch = useDispatch();
    const images = useSelector(state => Object.values(state.images));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div className="container">
            <Header />
            <main>
                <div className="exploreHeader">
                    <h1>Explore</h1>
                </div>
            {isLoaded && (
                <ul className="imagesContainer">
                    {images?.map(image => {
                        if (image.id) {
                            return <ImageHolder key={`image_${image.id}`} image={image} />
                        }
                    })}
                </ul>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
