import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useSelector, useDispatch } from 'react-redux';

import { getAllImages } from '../../store/images';

import './singleImage.css'

function SingleImage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const { imageId } = useParams();
    const image = useSelector(state => state.images[imageId]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [grow, setGrow] = useState('')
    const [showDelete, setShowDelete] = useState(false);


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
            <main className="mainSingleImage">
                { isLoaded && (
                <>
                    <div className="imageDisplay">
                        <img
                            src={image.image_url}
                            title={image.title}
                            className={grow}
                            onClick={toggleGrow}/>
                        {image.User.id === sessionUser.id?
                            <div className="trashCan"
                                onClick={() => setShowDelete(true)}>
                                <i className="fas fa-trash-alt"></i>
                            </div>
                            : null}
                    </div>
                    <div className="imageDetails">
                        <h1>{image.User.username}</h1>
                        <h2>{image.title}</h2>

                    </div>
                    {showDelete && (
                        <>
                            <div className="modalBackground">
                                <div className="deleteForm">
                                    <div className="topRowDelete">
                                        <h3>Delete Photo</h3>
                                        <div onClick={() => setShowDelete(false)}>X</div>
                                    </div>
                                    <div className="doYouWant">Do you want to permanently delete this photo?</div>
                                    <div className="bottomRowDelete">
                                        <div className="cancelDelete" onClick={() => setShowDelete(false)}>Cancel</div>
                                        <div className="deleteDelete">Delete</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default SingleImage;
