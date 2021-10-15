import { csrfFetch } from './csrf';

const LOAD = 'albumContents/Load';
const ADD_CONTENT = 'albumContents/Add';
const DELETE_CONTENT = 'albumContents/Delete'

const load = (albumContents) => {
    return {
        type: LOAD,
        albumContents
    };
};

const addAlbumContent = albumContent => {
    return {
        type: ADD_CONTENT,
        albumContent
    }
}

const deleteAlbumContent = albumContentId => {
    return {
        type: DELETE_CONTENT,
        albumContentId
    }
}

export const loadAlbumContents = () => async dispatch => {
    const response = await csrfFetch('/api/albumcontents');

    if (response.ok) {
        const albumContents = await response.json();
        dispatch(load(albumContents));
    }
}

export const addNewAlbumContent = (payload) => async dispatch => {
    const response = await csrfFetch('/api/albumcontents', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newAlbumContent = await response.json();
        dispatch(addAlbumContent(newAlbumContent));
        return newAlbumContent;
    }
}

export const deleteRow = (payload) => async dispatch => {
    const response = await csrfFetch('/api/albumcontents', {
        method: 'DELETE',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        dispatch(deleteAlbumContent(payload.id));
        return true;
    } else {
        return false;
    }
}

const initialState = {
    albumContents: null,
};

const albumContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allAlbumContents = {};
            action.albumContents.forEach(row => {
                allAlbumContents[row.id] = row;
            });
            return {
              ...allAlbumContents,
            };
        case ADD_CONTENT:
            return {
                ...state,
                [action.albumContent.id]: action.albumContent,
            }
        case DELETE_CONTENT:
            const newState = {...state}
            delete newState[action.albumContentId];
            return newState;
        default:
            return state;
    }
  };

  export default albumContentReducer;
