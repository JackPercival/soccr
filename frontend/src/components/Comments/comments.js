import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './comments.css';

import { loadComments } from '../../store/comments';


function Comments({image}) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.image_id === image.id));
    console.log("------------------------", comments)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadComments()).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }
    }, [dispatch]);


    return (
        <div className="commentsContainer">
            {isLoaded && (
                <>
                    {comments.map(comment => (
                        <div className="singleCommentContainer">
                            <div className="commentDetails">
                                <div className="commentProfIcon">
                                    <i className="fas fa-user-circle" id="profileButton"/>
                                </div>
                                <h4>{comment?.User.username}</h4>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Comments;
