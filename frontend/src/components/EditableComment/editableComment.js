import './editabaleComment.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSingleComment, updateComment } from '../../store/comments';

function EditableComment({comment, sessionUser}) {
    const dispatch = useDispatch();

    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showButton, setShowButton] = useState('')
    const [commentText, setCommentText] = useState(comment.comment);
    const [errors, setErrors] = useState([])

    //Clean up function for unmounted components- when they get deleted
    useEffect(() => {

        return () => {
            setShowEditCommentForm(false);
            setShowDelete(false);
            setShowButton('');
            setCommentText('');
        }
    }, []);

    const displayDeleteButtons = () => {
        setShowButton('')
        setShowDelete(true)
    }

    const hideDeleteButtons = () => {
        setShowButton('')
        setShowDelete(false)
    }

    const deleteComment = async () => {
        const commentId = comment.id;
        const wasDeleted = await dispatch(deleteSingleComment({commentId}))

        if (!wasDeleted) {
            alert("An error occured. Please refresh the page and try again.");
        }

        hideDeleteButtons();
    }

    const handleEditComment = async (e) => {
        e.preventDefault();

        if (commentText.length === 0) {
            setErrors(["Comment cannot be empty."])
            return;
        }

        if (commentText.length > 500) {
            setErrors(["Comment must be 500 characters or less."])
            return;
        }

        const payload= {
            id: comment.id,
            user_id: sessionUser.id,
            image_id: comment.image_id,
            comment: commentText
        }

        const updatedComment = await dispatch(updateComment(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log(errors)
             });

        // if (!updatedComment) {
        //     alert("An error occured. Please refresh the page and try again.");
        // }

        setShowEditCommentForm(false)
        setShowButton('')
    }

    return (
        <div key={comment.id} className="singleCommentContainer" id={showEditCommentForm || showDelete? 'stopHover' : null}
        onMouseOver={() => setShowButton('editCommentIcon')}
        onMouseOut={() => setShowButton('')}
        >
            <div className="topRowComment">
                <div className="commentDetails">
                    <div className="commentProfIcon">
                        <i className="fas fa-user-circle" id="profileButton"/>
                    </div>
                    <h4>{comment?.User? comment.User.username : sessionUser.username}</h4>
                </div>
                <div className="editCommentButtons">
                    <div id={showButton}
                        title="Edit Comment"
                        onClick={() => setShowEditCommentForm(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </div>
                    <div id={showButton}
                        title="Delete Comment"
                        onClick={displayDeleteButtons}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </div>
            </div>
            {!showEditCommentForm && <p>{comment?.comment}</p>}
            {showEditCommentForm && (
                <div className="commentDetails">
                    <div className="addCommentContainer">
                        <form className="addCommentForm" onSubmit={handleEditComment}>
                            <textarea
                                className="commentField"
                                id="editCommentTextArea"
                                placeholder="Add a comment"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                                <button className="commentButton" id="doneEditCommentButton">Done</button>
                        </form>
                        <ul>
                            {errors.map((error, idx) => <li className="loginError commentError" key={idx}>{error}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            {showDelete && (
                <div className="deleteButtons">
                    <button className="" id="deleteComment" onClick={deleteComment}>Delete Comment</button>
                    <button className="" id="cancelComment" onClick={hideDeleteButtons}>Cancel</button>
                </div>
            )}
        </div>

    )
}

export default EditableComment;
