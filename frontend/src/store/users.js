import { csrfFetch } from './csrf';

const LOAD = 'users/Load';

const load = (users) => {
    return {
        type: LOAD,
        users
    };
};

export const loadUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users')

    if (response.ok) {
        const users = await response.json();
        dispatch(load(users));
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
        default:
            return state;
    }
}

export default usersReducer;
