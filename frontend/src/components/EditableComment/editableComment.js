import './editabaleComment.css';

import { useEffect, useState } from 'react';

function EditableComment({comment, sessionUser}) {
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [showButton, setShowButton] = useState('')
    const [commentText, setCommentText] = useState(comment.comment)

    const displayDeleteButtons = () => {
        setShowButton('')
        setShowDelete(true)
    }

    const hideDeleteButtons = () => {
        setShowButton('')
        setShowDelete(false)
    }

    const handleEditComment = (e) => {
        e.preventDefault();

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
                            {/* {errors.map((error, idx) => <li className="loginError" key={idx}>{error}</li>)} */}
                        </ul>
                    </div>
                </div>
            )}
            {showDelete && (
                <div class="deleteButtons">
                    <button className="" id="deleteComment">Delete Comment</button>
                    <button className="" id="cancelComment" onClick={hideDeleteButtons}>Cancel</button>
                </div>
            )}
        </div>

    )
}

export default EditableComment;
