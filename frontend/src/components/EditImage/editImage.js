import Header from '../Header/header';
import Footer from '../Footer/footer';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import { getAllImages, updateImage } from '../../store/images';

import './editImage.css'

function EditImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const { imageId } = useParams();
    const image = useSelector(state => state.images[imageId]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [validationUploadErrors, setValidationUploadErrors] = useState([]);

    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        setDescription(image?.description)
        setTitle(image?.title)
        setImageUrl(image?.image_url)

        return () => {
            setDescription();
            setTitle();
            setImageUrl();
        }
    }, [image?.description, image?.title, image?.image_url])

    useEffect(() => {
        document.title = "Edit | Soccr";
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();

        const payload= {
            id: image.id,
            title,
            description,
            image_url,
            user_id: sessionUser.id
        }

        const updatedImg = await dispatch(updateImage(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationUploadErrors(data.errors);
             });

        if (updatedImg) {
            history.push(`/images/${image.id}`)
        }

    }

    //Redirect if the image does not belong to the user
    useEffect(() => {
        if (isLoaded && image?.user_id !== sessionUser?.id) {
            history.push('/explore')
        }
    },)

    return (
        <div className="container">
            <Header />
            <main className="mainImageEditor">
            { isLoaded && (
                <>
                    <div className="addButtonContainer">
                        <Link to={`/images/${image?.id}`}>
                            <div className="addButton">
                                <i className="fas fa-ban"></i>
                                <h4 className="addNewImageH4">Cancel Edit</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="imageEditorContainer">
                        <div className="imageEditFormContainer">
                            <h3>Editing 1 Photo:</h3>
                            <ul>
                                {validationUploadErrors.map(error => <li className="loginError" key={error}>{error}</li>)}
                            </ul>
                            <div>
                                <form className="imageEditForm" onSubmit={(e) => handleUpload(e)} autoComplete="off">
                                    <div>
                                        <label htmlFor="title">Edit Title</label>
                                        <input id="title"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={(isLoaded? title : image?.title)}
                                        onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Edit Description</label>
                                        <input id="description"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={(isLoaded? description : image?.description)}
                                        onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <button className="uploadImage" type="submit">Edit 1 Photo</button>
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

export default EditImage;
