import { csrfFetch } from './csrf';

const LOAD = 'albumContents/Load';

const load = (albumContents) => {
    return {
        type: LOAD,
        albumContents
    };
};

export const loadAlbumContents = () => async dispatch => {
    const response = await csrfFetch('/api/albumcontents');

    if (response.ok) {
        const albumContents = await response.json();
        dispatch(load(albumContents));
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
        default:
            return state;
    }
  };

  export default albumContentReducer;
