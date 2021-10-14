import { csrfFetch } from './csrf';

const LOAD = 'albums/Load';
const ADD_ALBUM = 'albums/Add';

const load = (albums) => {
    return {
        type: LOAD,
        albums
    };
};

const addAlbum = album => {
    return {
        type:ADD_ALBUM,
        album
    }
}

export const loadAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums');

    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums));
    }
}

export const addNewAlbum = (payload) => async dispatch => {
    const response = await csrfFetch('/api/albums', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(addAlbum(newAlbum));
        return newAlbum;
    }
}

const initialState = {
    albums: [],
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allAlbums = {};
            action.albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            return {
                ...state,
              ...allAlbums,
            };
        case ADD_ALBUM:
            return {
                ...state,
                [action.album.id]: action.album,
            }
        default:
            return state;
    }
  };

  export default albumsReducer;
