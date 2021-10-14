import Header from '../Header/header';
import Footer from '../Footer/footer';
import UploadAlbumImageHolder from '../UploadAlbumImageHolder/uploadAlbumImageHolder';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllImages } from '../../store/images';

import './uploadAlbum.css'

function UploadAlbum() {
    const dispatch = useDispatch();
    const images = useSelector(state => Object.values(state.images));

    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedImages, setSelectedImages] = useState(new Set());

    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    //Add or remove images to the selectedImages state
    const toggleSelectedImages = (imageId) => {
        const currentImages = selectedImages;

        if (currentImages.has(imageId)) {
            currentImages.delete(imageId)
        } else {
            currentImages.add(imageId);
        }

        setSelectedImages(currentImages);
    }

    return (
        <div className="container">
            <Header />
            <main className="mainImageEditor">
            { isLoaded && (
                <>
                    <div className="addButtonContainer">
                        <Link to='/explore'>
                            <div className="addButton">
                                <i className="fas fa-ban"></i>
                                <h4 className="addNewImageH4">Cancel</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="imageEditorContainer">
                        <div className="imageEditFormContainer">
                            <h3>Creating 1 Album:</h3>
                            <ul>
                                {/* {validationUploadErrors.map(error => <li className="loginError" key={error}>{error}</li>)} */}
                            </ul>
                            <div>
                                <form className="imageEditForm" autoComplete="off">
                                    <div>
                                        <label htmlFor="title">Album Title</label>
                                        <input id="title"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <button className="uploadImage" type="submit">Create Album</button>
                                </form>
                            </div>
                        </div>
                        <div className="selectionContainer">
                            <h1>Select Images to Add to Album</h1>
                            <ul className="imagesContainer2" id="uploadAlbumImageContainer">
                                {images?.map((image, index) => {
                                    if (image.id) {
                                        return (
                                                <div className="divUploadHolder" key={image.id} onClick={() => toggleSelectedImages(image.id)}>
                                                    <UploadAlbumImageHolder image={image} />
                                                </div>
                                            )
                                    } else {
                                        return null;
                                    }
                                })}
                                <li id="emptyLi"></li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default UploadAlbum;