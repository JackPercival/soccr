import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Comments from '../Comments/comments'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllImages, deleteSingleImage } from '../../store/images';

import './singleImage.css'

function SingleImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const { imageId } = useParams();
    const image = useSelector(state => state.images[imageId]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [grow, setGrow] = useState('')
    const [showDelete, setShowDelete] = useState(false);


    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        document.title = `${image?.title} | Soccr`;
    }, [image?.title]);

    const toggleGrow = () => {
        if (grow === "grow") {
            setGrow('')
        } else {
            setGrow('grow')
        }
    }

    const deleteImage = async () => {
        const wasDeleted = await dispatch(deleteSingleImage({imageId}))

        if (wasDeleted) {
            history.push('/explore')
        } else {
            alert("An error occured. Please refresh the page and try again.")
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
                            src={image?.image_url}
                            title={image?.title}
                            className={grow}
                            alt={`${image?.title} `}
                            onClick={toggleGrow}/>
                        {image?.User.id === sessionUser?.id?
                            <div className="userEditContainer">
                                <Link to={`/images/${image.id}/edit`}>
                                    <div className="userEdits editButton" title="Edit Image">
                                        <i className="fas fa-edit"></i>
                                    </div>
                                </Link>
                                <div className="userEdits trashCan"
                                    onClick={() => setShowDelete(true)}
                                    title="Delete Image">
                                    <i className="fas fa-trash-alt"></i>
                                </div>
                            </div>
                            : null}
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
                                        <div className="deleteDelete" onClick={deleteImage}>Delete</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="imageDetailsContainer">
                        <div className="imageDetails">
                            <div className="profIcon">
                                <i className="fas fa-user-circle" id="profileButton"/>
                            </div>
                            <div className="imageInfo">
                                <h1>{image?.User.username}</h1>
                                <h2>{image?.title}</h2>
                            </div>
                        </div>
                        <p className="imageDescription">{image?.description}</p>
                        <Comments image={image}/>
                    </div>
                </>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default SingleImage;
