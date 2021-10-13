import { csrfFetch } from './csrf';

const LOAD = 'comments/Load';
const ADD_COMMENT = 'comment/Add';
const UPDATE_COMMENT = 'comment/Update'
const DELETE_COMMENT = 'comment/Delete';

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

const update = comment => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

const deleteComment = commentId => {
    return {
        type: DELETE_COMMENT,
        commentId
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
        return comment;
    }
}

export const updateComment = (payload) => async dispatch => {
    const response = await csrfFetch('/api/comments', {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(update(updatedComment));
        return updatedComment;
    }
}

export const deleteSingleComment = (payload) => async dispatch => {
    const response = await csrfFetch('/api/comments', {
        method: 'DELETE',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        dispatch(deleteComment(payload.commentId));
        return true;
    } else {
        return false;
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
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
        case DELETE_COMMENT:
            const newState = {...state}
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;
