import { csrfFetch } from './csrf';

const LOAD = 'comments/Load';
const ADD_COMMENT = 'comment/Add'

const load = (comments) => {
    return {
        type: LOAD,
        comments
    };
};

const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const loadComments = () => async dispatch => {
    const response = await csrfFetch('/api/comments')

    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments));
    }
}

export const addNewComment = (payload) => async dispatch => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
    }
}

const initialState = {
    comments: [],
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allComments = {}
            action.comments.forEach(comment => {
                allComments[comment.id] = comment;
            })
            return {
                ...state,
                ...allComments,
            }
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        default:
            return state;
    }
}

export default commentsReducer;
