import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './comments.css';

import { loadComments, addNewComment } from '../../store/comments';


function Comments({image}) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.image_id === image.id));

    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(loadComments()).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    const handleNewComment = (e) => {
        e.preventDefault();
        setErrors([]);

        const payload= {
            comment,
            image_id: image.id,
            user_id: sessionUser.id
        }

        console.log("Dispatched")

        return dispatch(addNewComment(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
        });

    }

    return (
        <div className="commentsContainer">
            {isLoaded && (
                <>
                    {comments.map(comment => (
                        <div key={comment.id} className="singleCommentContainer">
                            <div className="commentDetails">
                                <div className="commentProfIcon">
                                    <i className="fas fa-user-circle" id="profileButton"/>
                                </div>
                                <h4>{comment?.User.username}</h4>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    <div className="singleCommentContainer addCommentContainer">
                            <div className="commentDetails">
                                <div className="commentProfIcon addCommentProfIcon">
                                    <i className="fas fa-user-circle" id="profileButton"/>
                                </div>
                                <div className="addCommentContainer">
                                    <form className="addCommentForm" onSubmit={handleNewComment}>
                                        <textarea
                                            className="commentField"
                                            placeholder="Add a comment"
                                            onChange={(e) => setComment(e.target.value)}
                                            onClick={() => setShowAddComment(true)}
                                            onBlur={() => setShowAddComment(false)}
                                        ></textarea>
                                        {showAddComment && <button className="commentButton">Comment</button>}
                                    </form>
                                    <ul>
                                        {errors.map((error, idx) => <li className="loginError" key={idx}>{error}</li>)}
                                    </ul>
                                </div>
                            </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Comments;
