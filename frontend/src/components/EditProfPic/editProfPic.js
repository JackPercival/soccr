import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateProfilePic, updateBannerPic } from '../../store/users';
import { restoreUser } from '../../store/session';
import './editProfPic.css'

function EditProfPic({user}) {
    const dispatch = useDispatch();
    const [profile_url, setProfileUrl] = useState('');
    const [banner_url, setBannerUrl] = useState('');

    const [showEditButtons, setShowEditButtons] = useState(false);
    const [showChangePic, setShowChangePic] = useState(false);
    const [showChangeBanner, setShowChangeBanner] = useState(false);

    const handleCancel = () => {
        setShowChangePic(false);
        setProfileUrl('');
    }

    const handleBannerCancel = () => {
        setShowChangeBanner(false);
        setBannerUrl('');
    }

    const handleProfilePictureUpdate = async (e) => {
        e.preventDefault();

        const payload= {
            id: user.id,
            profile_pic: profile_url
        }

        const updatedProfPic = await dispatch(updateProfilePic(payload))


        if (!updatedProfPic) {
            alert("An error occured. Please refresh the page and try again.");
        }

        //This resets the icon in the header
        dispatch(restoreUser())

        setShowChangePic(false);
        setProfileUrl('');
    }

    const handleBannerPictureUpdate = async (e) => {
        e.preventDefault();

        const payload= {
            id: user.id,
            banner_pic: banner_url
        }

        console.log(payload)

        const updatedBannerPic = await dispatch(updateBannerPic(payload))


        if (!updatedBannerPic) {
            alert("An error occured. Please refresh the page and try again.");
        }

        //This resets the icon in the header
        dispatch(restoreUser())

        setShowChangeBanner(false);
        setBannerUrl('');
    }

    const handleEditClose = () => {
        if (showEditButtons) {
            setShowEditButtons(false);
            setShowChangePic(false);
            setShowChangeBanner(false);
            setProfileUrl('');
            setBannerUrl('');
        } else {
            setShowEditButtons(true);
        }
    }

    useEffect(() => {
        if (!showEditButtons) return;

        const closeMenu = () => {
            setShowEditButtons(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showEditButtons]);

    return (
        <>
            <div>
                <div className="showEditOptions" onClick={handleEditClose}>
                    <div className="dotHolder">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>

            {showEditButtons && (
            <>
                <div className="editPhotos">
                    <div className="triangle"></div>
                    <div className="changeProfPic" onClick={() => setShowChangePic(!showChangePic)}>Edit Profile Picture</div>
                    <div className="changeProfPic" id="changeBanner" onClick={() => setShowChangeBanner(true)}>Edit Cover Photo</div>
                </div>

            </>
            )}
            {showChangePic && (
                <div className="editPhotos">
                    <div className="triangle"></div>
                    <div className="updatePicContainer">
                        <form className="">
                            <input
                                className="profPicInput"
                                placeholder="Add Profile URL"
                                value={profile_url}
                                onChange={(e) => setProfileUrl(e.target.value)}
                            />
                            <div className="updatePicButtons">
                                <button onClick={handleProfilePictureUpdate}>Update</button>
                                <button type="button" id="cancelUpdate"onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showChangeBanner && (
                <div className="editPhotos">
                    <div className="triangle"></div>
                    <div className="updatePicContainer">
                        <form className="">
                            <input
                                className="profPicInput"
                                placeholder="Add Cover Photo URL"
                                value={banner_url}
                                onChange={(e) => setBannerUrl(e.target.value)}
                            />
                            <div className="updatePicButtons">
                                <button onClick={handleBannerPictureUpdate}>Update</button>
                                <button type="button" id="cancelUpdate"onClick={handleBannerCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </>
    )

}

export default EditProfPic;
