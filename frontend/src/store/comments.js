import { csrfFetch } from './csrf';

const LOAD = 'comments/Load';

const load = (comments) => {
    return {
        type: LOAD,
        comments
    };
};

export const loadComments = () => async dispatch => {
    const response = await csrfFetch('/api/comments')

    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments));
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
        default:
            return state;
    }
}

export default commentsReducer;
