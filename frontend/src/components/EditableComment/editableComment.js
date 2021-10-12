import './editabaleComment.css';

import { useEffect, useState } from 'react';

function EditableComment({comment, sessionUser}) {
    const [showEditComment, setShowEditComment] = useState(false);
    const [showButton, setShowButton] = useState('')

    return (
        <div key={comment.id} className="singleCommentContainer"
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
                    <div id={showButton} title="Edit Comment">
                        <i className="fas fa-edit"></i>
                    </div>
                    <div id={showButton}
                        title="Delete Comment">
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </div>
            </div>
            <p>{comment?.comment}</p>
        </div>
    )
}

export default EditableComment;
