import Header from '../Header/header';
import Footer from '../Footer/footer';
import UploadAlbumImageHolder from '../UploadAlbumImageHolder/uploadAlbumImageHolder';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import { getAllImages } from '../../store/images';
import { updateAlbum, loadAlbums } from '../../store/albums';
import { addNewAlbumContent, loadAlbumContents, deleteRow } from '../../store/albumContents';

import './editAlbum.css'

function EditAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { albumId } = useParams();

    const images = useSelector(state => Object.values(state.images));
    const sessionUser = useSelector(state => state.session.user);
    const album = useSelector(state => state.albums[albumId]);

    //Extract the album contents of the single album
    let albumContents = useSelector(state => Object.values(state.albumContents).filter(contents => contents?.album_id === album?.id))

    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [errors, setErrors] = useState([]);

    useEffect(() => {
            dispatch(loadAlbums())
            dispatch(getAllImages())
            dispatch(loadAlbumContents())
            .then(() => setIsLoaded(true))
    }, [isLoaded, dispatch]);

    useEffect(() => {
        setTitle(album?.title);

        return () => {
            setTitle();
        }

    }, [album?.title])

    //Redirect if the album does not belong to the user
    useEffect(() => {
        if (isLoaded && album?.user_id !== sessionUser?.id) {
            history.push('/explore')
        }
    })

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

    const checkErrors = (albumContentImages) => {
        const errors = [];

        //Check if Nothing is selected, by comparing the preSelected images to the currently selected images
        //If they are the same, that means the user clicked on each image to deselect it (thus adding it to the selectedImages set)
        //If they clicked on all preSelected images (to deselect all of them) AND did not select any new images, that would mean the
        //two arrays are of equal values, meaning nothing was actually visibly selected, so we should throw an error
        const array1 = [...selectedImages].sort()
        const array2 = [...albumContentImages].sort()
        const equalArrays = JSON.stringify(array1) === JSON.stringify(array2);

        if ((selectedImages.size === 0 && albumContents.length === 0) || equalArrays) {
            errors.push("You must select at least 1 image.")
        }
        if (title.length === 0 || title.length > 30) {
            errors.push("Title must be between 1 and 30 characters.")
        }

        return errors;
    }

    const editAlbum = async () => {
        const payload = {
            id: album.id,
            title,
        }

        const changedAlbum = await dispatch(updateAlbum(payload));
        return changedAlbum;
    }

    const handledAlbumContentEdits = async (albumContentImages) => {
        let redirect = true;

            for (const image of selectedImages) {

                //If the original preselected images are in this list, that means the user want to delete them
                if (albumContentImages.includes(image)) {
                    //Delete it
                    //Find the correct rowId
                    let rowId = albumContents.filter(row => row.image_id === image).map(row => row.id)[0];

                    const payload = {
                        id: rowId
                    }

                    const deletedRow = await dispatch(deleteRow(payload));

                    if (!deletedRow) {
                        alert("An error occured. Refresh the page and try again.");
                        redirect = false;
                        break;
                    }

                // Else these are new images that we want to add
                } else {

                    const payload = {
                        album_id: album.id,
                        image_id: image
                    }

                    const newRow = await dispatch(addNewAlbumContent(payload));

                    if (!newRow) {
                        alert("An error occured. Refresh the page and try again.");
                        redirect = false;
                        break;
                    }
                }

            }
        return redirect;
    }

    //I could not figure out how to add the already selected images into the
    //selectedImages state, so I have to do some weird stuff on submit

    //The SelectedImages now includes images that need to be added and deleted
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Extract just the image Ids
        const albumContentImages = albumContents.map(row => row.image_id)

        const errors = checkErrors(albumContentImages);

        if (errors.length) {
            setErrors(errors)
            return;
        }

        //Update the Album Title
        const editSuccess = editAlbum();

        //If editing the album title worked, edit the AlbumContents
        if (editSuccess) {

            const redirect = await handledAlbumContentEdits(albumContentImages);

            // Redirect to album if it all works
            if (redirect) {
                history.push(`/albums/${album.id}`)
            }
        }
    }

    document.title = `Edit Album | Soccr`;

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
                            <h3>Editing 1 Album:</h3>
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
                                        value={(isLoaded? title : album?.title)}
                                        onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <button className="uploadImage" type="submit">Edit Album</button>
                                </form>
                            </div>
                        </div>
                        <div className="selectionContainer">
                            <h1>{`Edit the ${album?.title} Album`}</h1>
                            <ul className="imagesContainer2" id="uploadAlbumImageContainer">
                                {images?.map((image, index) => {
                                    if (image.id) {
                                        return (
                                                <div className="divUploadHolder" key={image.id} onClick={() => toggleSelectedImages(image.id)}>
                                                    {/* Pass  all the images in the albumContents to determine if the image should be pre-bordered or not */}
                                                    <UploadAlbumImageHolder image={image} albumContents={albumContents.map(content => content?.image_id)}/>
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

export default EditAlbum;
