import { csrfFetch } from './csrf';

const LOAD = 'users/Load';
const UPDATE = 'users/Update'

const load = (users) => {
    return {
        type: LOAD,
        users
    };
};

const update = user => {
    return {
        type: UPDATE,
        user
    }
}

export const loadUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users')

    if (response.ok) {
        const users = await response.json();
        dispatch(load(users));
    }
}

export const updateProfilePic = (payload) => async dispatch => {
    const response = await csrfFetch('/api/users/profilepic', {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedUser = await response.json();
        dispatch(update(updatedUser));
        return updatedUser;
    }
}

export const updateBannerPic = (payload) => async dispatch => {
    const response = await csrfFetch('/api/users/banner', {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedUser = await response.json();
        dispatch(update(updatedUser));
        return updatedUser;
    }
}


const initialState = {
    users: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allUsers = {}
            action.users.forEach(user => {
                allUsers[user.id] = user;
            })
            return {
                ...state,
                ...allUsers,
            }
        case UPDATE:
            return {
                ...state,
                [action.user.id]: {
                    ...state[action.user.id],
                    ...action.user
                }
            }
        default:
            return state;
    }
}

export default usersReducer;
