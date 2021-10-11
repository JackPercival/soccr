import Header from '../Header/header';
import Footer from '../Footer/footer';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoginFormPage from '../LoginFormPage/login';

import './upload.css'

function Upload() {
    const sessionUser = useSelector(state => state.session.user);

    const [image_url, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const [addClicked, setAddClicked] = useState(false);
    const [showImageForm, setShowImageForm] = useState(false)

    const validate = () => {
        const validationErrors = [];
        const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

        if (!image_url) {
            validationErrors.push("Please provide an Image URL.")
        } else if (regex.test(image_url) === false) {
            validationErrors.push("Please provide a valid URL.")
        }

        return validationErrors;
    }

    const handleImageUrlSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) return setValidationErrors(errors);
        setAddClicked(false)
        setShowImageForm(true)
    }

    if (sessionUser) {
        return (
        <div className="container">
            <Header />
            <main className="mainImageEditor">
                <div className="addButton" onClick={() => setAddClicked(true)}>
                    <i className="fas fa-plus-square"></i>
                    <h4 className="addNewImageH4">Add</h4>
                </div>

                {addClicked && (
                    <>
                        <div>Add Image</div>
                        <ul>
                            {validationErrors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        <form onSubmit={handleImageUrlSubmit} autoComplete="off">
                            <label>Image URL</label>
                            <input
                                type="text"
                                value={image_url}
                                autoComplete="off"
                                required
                                onChange={(e) =>setImageUrl(e.target.value)}
                            />
                            <button disabled={image_url.length === 0} type="submit">Upload</button>
                        </form>
                    </>

                )}
                {showImageForm && (
                    <>
                        <div className="imageEditorContainer">
                            <div className="imageEditFormContainer">
                                <h3>Editing 1 Photo:</h3>
                                <div>
                                    <form className="imageEditForm">
                                        <div>
                                            <label htmlFor="title">Add a Title</label>
                                            <input id="title"
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description">Add a Description</label>
                                            <input id="description"
                                            type="text"
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button className="uploadImage" type="submit">Upload Photo</button>
                                    </form>
                                </div>
                            </div>
                            <div className="newImageDisplay">
                                <img src={image_url} alt="New Image Upload" />
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
