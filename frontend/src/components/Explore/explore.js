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
        // dispatch(loadUsers())
        dispatch(getAllImages()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    useEffect(() => {
        document.title = "Explore | Soccr";
    }, []);

    return (
        <div className="container">
            <Header />
            <main>
                <div className="exploreHeader">
                    <h1>Explore</h1>
                </div>
            {!isLoaded && (
                <div className="loadingContainer">
                    <h3>Loading Images</h3>
                    <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                </div>
            )}
            {isLoaded && (
                <ul className="imagesContainer">
                    {images?.map(image => {
                        if (image.id) {
                            return <ImageHolder key={`image_${image.id}`} image={image} />
                        } else {
                            return null;
                        }
                    })}
                    <li id="emptyLi"></li>
                </ul>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
