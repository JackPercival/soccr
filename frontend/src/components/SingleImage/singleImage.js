import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useSelector, useDispatch } from 'react-redux';

import { getAllImages } from '../../store/images';

import './singleImage.css'

function SingleImage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [grow, setGrow] = useState('')

    const { imageId } = useParams();
    const image = useSelector(state => state.images[imageId]);

    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const toggleGrow = () => {
        if (grow === "grow") {
            setGrow('')
        } else {
            setGrow('grow')
        }
    }

    return (
        <div className="container">
            <Header />
            <main>
                { isLoaded && (
                <div className="imageDisplay">
                    <img
                        src={image.image_url}
                        title={image.title}
                        className={grow}
                        onClick={toggleGrow}/>
                </div>
                )}
                <div className="imageDetails">

                </div>
                {/* <h1>Review Section {image?.title}</h1> */}
            </main>
            <Footer />
        </div>
    )
}

export default SingleImage;
