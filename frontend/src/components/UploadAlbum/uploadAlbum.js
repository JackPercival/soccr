import Header from '../Header/header';
import Footer from '../Footer/footer';
import UploadAlbumImageHolder from '../UploadAlbumImageHolder/uploadAlbumImageHolder';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getAllImages } from '../../store/images';
import { addNewAlbum } from '../../store/albums';

import './uploadAlbum.css'

function UploadAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();
    const images = useSelector(state => Object.values(state.images));
    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(getAllImages()).then(() => setIsLoaded(true));
        }
    }, [isLoaded, dispatch]);

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

    //Check for no images and title length
    //Then dispatch to create the album and return the album id
    //Then for each image in the set, dispatch to create a row in album_contents
    //Then redirect to the new album
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        if (selectedImages.size === 0) {
            errors.push("You must select at least 1 image.")
        }
        if (title.length === 0 || title.length > 30) {
            errors.push("Title must be between 1 and 30 characters.")
        }

        if (errors.length) {
            setErrors(errors)
            return;
        }

        const payload = {
            title,
            user_id: sessionUser.id
        }

        const newAlbum = await dispatch(addNewAlbum(payload));

        if (newAlbum) {
            history.push(`/albums/${newAlbum.id}`)
        }

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
                                {errors.map(error => <li className="loginError" key={error}>{error}</li>)}
                            </ul>
                            <div>
                                <form className="imageEditForm" autoComplete="off" onSubmit={handleSubmit}>
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
