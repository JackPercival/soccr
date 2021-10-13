import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditableComment from '../EditableComment/editableComment';

import './comments.css';

import { loadComments, addNewComment } from '../../store/comments';


function Comments({image}) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.image_id === image?.id));
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

    const toggleCommentButton = () => {
        if (comment.length === 0) {
            setShowAddComment(false)
        }
    }

    const handleNewComment = async (e) => {
        e.preventDefault();

        if (comment.length === 0) {
            setErrors(["Comment cannot be empty."])
            return;
        }

        if (comment.length > 500) {
            setErrors(["Comment must be 500 characters or less."])
            return;
        }

        const payload= {
            comment,
            image_id: image.id,
            user_id: sessionUser.id
        }

        await dispatch(addNewComment(payload))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        // });

        setComment('')
        setShowAddComment(false)

    }

    return (
        <div className="commentsContainer">
            {isLoaded && (
                <>
                    {comments.map((comment, index) => {
                        if (comment.user_id === sessionUser?.id) {
                            return (
                                <EditableComment key={`${comment.id} ${index}`} comment={comment} sessionUser={sessionUser}/>
                            )
                        }
                        return (
                            <div key={`${comment.id} ${index}`} className="singleCommentContainer">
                                <div className="commentDetails">
                                    {comment.User?.profile_pic? (
                                        <div className="customCommentIcon">
                                            <Link to={`/people/${comment.user_id}`}>
                                                <img src={comment.User.profile_pic} alt=""/>
                                            </Link>
                                        </div>
                                    ):
                                    (
                                        <div className="commentProfIcon">
                                            <Link to={`/people/${comment.user_id}`}>
                                                <i className="fas fa-user-circle" id="profileButton"/>
                                            </Link>
                                        </div>
                                    )}
                                    <Link to={`/people/${comment?.User? comment.User.id : sessionUser?.id}`} className="commentUsername">
                                        <h4>{comment?.User? comment.User.username : sessionUser?.username}</h4>
                                    </Link>
                                </div>
                                <p>{comment?.comment}</p>
                            </div>
                        )
                    })}
                    {sessionUser && (
                        <div className="singleCommentContainer addCommentContainer">
                                <div className="commentDetails">
                                    {sessionUser.profile_pic? (
                                        <div className="customCommentIcon" id="addCommentProfIcon">
                                            <img src={sessionUser.profile_pic} alt=""/>
                                        </div>
                                    ):
                                    (
                                        <div className="commentProfIcon" id="addCommentProfIcon">
                                            <i className="fas fa-user-circle" id="profileButton"/>
                                        </div>
                                    )}
                                    <div className="addCommentContainer">
                                        <form className="addCommentForm" onSubmit={handleNewComment}>
                                            <textarea
                                                className="commentField"
                                                placeholder="Add a comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                onClick={() => setShowAddComment(true)}
                                                onBlur={toggleCommentButton}
                                            ></textarea>
                                            {showAddComment &&
                                                <button
                                                    className="commentButton"
                                                >Comment</button>
                                            }
                                        </form>
                                        <ul>
                                            {errors.map((error, idx) => <li className="loginError newCommentError" key={idx}>{error}</li>)}
                                        </ul>
                                    </div>
                                </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Comments;
