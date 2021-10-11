import { useSelector, useDispatch } from 'react-redux';

import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import './explore.css'


function ExplorePage() {
    const images = useSelector(state => Object.values(state.images));

    return (
        <div className="container">
            <Header />
            <main>
                <div className="exploreHeader">
                    <h1>Explore</h1>
                </div>
                <div className="imagesContainer">
                    {images?.map(image => (
                        <ImageHolder key={`image_${image.id}`} image={image} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
