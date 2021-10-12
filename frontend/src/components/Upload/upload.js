import Header from '../Header/header';
import Footer from '../Footer/footer';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginFormPage from '../LoginFormPage/login';

import { addNewImage } from '../../store/images';

import './upload.css'

function Upload() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [image_url, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [validationUploadErrors, setValidationUploadErrors] = useState([]);

    const [addClicked, setAddClicked] = useState(false);
    const [showFirstForm, setShowFirstForm] = useState(true);
    const [disableAdd, setDisableAdd] = useState('');
    const [showImageForm, setShowImageForm] = useState(false)

    const validateURL = () => {
        const validationErrors = [];
        const regex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

        if (!image_url) {
            validationErrors.push("Please provide an Image URL.")
        } else if (regex.test(image_url) === false) {
            validationErrors.push("Please provide a valid URL.")
        }

        return validationErrors;
    }
    const handleAddClicked = () => {
            setAddClicked(true);
            setDisableAdd('disabledAdd');
    }

    const handleImageUrlSubmit = (e) => {
        e.preventDefault();
        const errors = validateURL();
        if (errors.length > 0) return setValidationErrors(errors);
        setAddClicked(false)
        setShowFirstForm(false);
        setShowImageForm(true)
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        const payload= {
            title,
            description,
            image_url,
            user_id: sessionUser.id
        }

        const newImg = await dispatch(addNewImage(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationUploadErrors(data.errors);
             });

        if (newImg) {
            history.push(`/images/${newImg.id}`)
        }
    }

    if (sessionUser) {
        return (
        <div className="container">
            <Header />
            <main className="mainImageEditor">
                <div className="addButtonContainer">
                    <div className="addButton" id={disableAdd} onClick={handleAddClicked}>
                        <i className="fas fa-plus-square"></i>
                        <h4 className="addNewImageH4">Add</h4>
                    </div>
                </div>

                {!addClicked && !showImageForm && (
                    <>
                        <div className="uploadIntro">
                            <h1>You can upload photos here.</h1>
                            <div onClick={handleAddClicked} className="uploadImage" id="uploadIntroButton">Choose photo to upload</div>
                        </div>
                    </>
                )}

                {addClicked && showFirstForm && (
                    <>
                        <div className="imageEditFormContainer" id="addURLContainer">
                            <h3>Start Upload:</h3>
                            <ul>
                                {validationErrors.map(error => <li className="loginError" key={error}>{error}</li>)}
                            </ul>
                            <form onSubmit={handleImageUrlSubmit} autoComplete="off" className="imageEditForm">
                                <div>
                                    <label>Image URL</label>
                                    <input
                                        type="text"
                                        value={image_url}
                                        required
                                        autoComplete="off"
                                        onChange={(e) =>setImageUrl(e.target.value)}
                                    />
                                </div>
                                <button className="uploadImage" type="submit">Start</button>
                            </form>
                        </div>
                    </>
                )}
                {showImageForm && (
                    <>
                        <div className="imageEditorContainer">
                            <div className="imageEditFormContainer">
                                <h3>Editing 1 Photo:</h3>
                                <ul>
                                    {validationUploadErrors.map(error => <li className="loginError" key={error}>{error}</li>)}
                                </ul>
                                <div>
                                    <form className="imageEditForm" onSubmit={handleUpload} autoComplete="off">
                                        <div>
                                            <label htmlFor="title">Add a Title</label>
                                            <input id="title"
                                            type="text"
                                            required
                                            autoComplete="off"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description">Add a Description</label>
                                            <input id="description"
                                            type="text"
                                            required
                                            autoComplete="off"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button className="uploadImage" type="submit">Upload 1 Photo</button>
                                    </form>
                                </div>
                            </div>
                            <div className="newImageDisplay">
                                <img src={image_url} alt="New Upload" />
                            </div>
                        </div>
                    </>
                )}

            </main>
            <Footer />
        </div>
        )
    }

    return (
        <LoginFormPage />
    )
}

export default Upload;
