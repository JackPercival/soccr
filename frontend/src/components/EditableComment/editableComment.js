import './editabaleComment.css';

import { useEffect, useState } from 'react';

function EditableComment({comment, sessionUser}) {
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
    const [showButton, setShowButton] = useState('')
    const [commentText, setCommentText] = useState(comment.comment)

    const showDeleteModal = () => {
        setShowDeleteCommentModal(true)
        setShowButton('')
    }

    const handleEditComment = (e) => {
        e.preventDefault();

        setShowEditCommentForm(false)
        setShowButton('')
    }

    return (
        <div key={comment.id} className="singleCommentContainer" id={showEditCommentForm? 'stopHover' : null}
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
                        onClick={showDeleteModal}
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
            {showDeleteCommentModal && (
                <div className="editModalBackground">
                    <div className="deleteForm">
                        <div className="topRowDelete">
                            <h3>Delete Comment</h3>
                            <div onClick={() => setShowDeleteCommentModal(false)}>X</div>
                        </div>
                        <div className="doYouWant">Do you want to permanently delete this comment?</div>
                        <div className="bottomRowDelete">
                            <div className="cancelDelete" onClick={() => setShowDeleteCommentModal(false)}>Cancel</div>
                            <div className="deleteDelete"
                            // onClick={deleteImage}
                            >Delete</div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default EditableComment;
