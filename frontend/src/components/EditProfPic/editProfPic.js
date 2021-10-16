import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUsers, updateProfilePic, updateBannerPic } from '../../store/users';
import { restoreUser } from '../../store/session';

function EditProfPic({user}) {
    const dispatch = useDispatch();
    const [profile_url, setProfileUrl] = useState('');
    const [banner_url, setBannerUrl] = useState();

    const [showEditButtons, setShowEditButtons] = useState(false)
    const [showChangePic, setShowChangePic] = useState(false)
    const [showChangeBanner, setShowChangeBanner] = useState(false)

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

        const updatedBannerPic = await dispatch(updateBannerPic(payload))


        if (!updatedBannerPic) {
            alert("An error occured. Please refresh the page and try again.");
        }

        //This resets the icon in the header
        dispatch(restoreUser())

        setShowChangeBanner(false);
        setBannerUrl('');
    }

    return (
        <>
            <div className="showEditOptions" onClick={() => setShowEditButtons(true)}>
                <div className="dotHolder">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>

            {showEditButtons && (
                <>
                    {(!showChangePic && !showChangeBanner) && (
                        <div className="editPhotos">
                            <div className="changeProfPic" onClick={() => setShowChangePic(true)}>Change Profile Picture</div>
                            <div className="changeProfPic" id="changeBanner" onClick={() => setShowChangeBanner(true)}>Change Banner Picture</div>
                            <div onClick={() => setShowEditButtons(false)}>Close</div>
                        </div>
                    )}
                </>
            )}

            {showChangePic && (
                <div className="updatePicContainer">
                    <form className="">
                        <input
                            className="profPicInput"
                            placeholder="Add a Profile URL"
                            value={profile_url}
                            onChange={(e) => setProfileUrl(e.target.value)}
                        />
                        <div className="updatePicButtons">
                            <button onClick={handleProfilePictureUpdate}>Update</button>
                            <button type="button" id="cancelUpdate"onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {showChangeBanner && (
                <div className="updatePicContainer">
                <form className="">
                    <input
                        className="profPicInput"
                        placeholder="Add a Banner URL"
                        value={banner_url}
                        onChange={(e) => setBannerUrl(e.target.value)}
                    />
                    <div className="updatePicButtons">
                        <button onClick={handleBannerPictureUpdate}>Update</button>
                        <button type="button" id="cancelUpdate"onClick={handleBannerCancel}>Cancel</button>
                    </div>
                </form>
                </div>
            )}
        </>
    )

}

export default EditProfPic;
