import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './comments.css';

import { loadComments } from '../../store/comments';


function Comments({image}) {
    console.log(image.id, "*********")
    const dispatch = useDispatch();
    const images = useSelector(state => Object.values(state.images));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadComments()).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }
    }, [dispatch]);


    return (
        <h1>Comments</h1>
    )
}

export default Comments;
