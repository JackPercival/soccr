import { csrfFetch } from './csrf';

const LOAD = 'albums/Load';

const load = (albums) => {
    return {
        type: LOAD,
        albums
    };
};

export const loadAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums');

    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums));
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
        default:
            return state;
    }
  };

  export default albumsReducer;
