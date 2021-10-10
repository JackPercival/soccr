import { csrfFetch } from './csrf';

const LOAD = 'images/Load';

const load = (list) => {
    return {
        type: LOAD,
        list
    };
};

export const getAllImages = () => async dispatch => {
    const response = await csrfFetch('api/images');

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const initialState = {
    images: [],
  };

const imagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            const allImages = {};
            action.list.forEach(image => {
                allImages[image.id] = image;
            });
            return {
                ...state,
              ...allImages,
            };
          }
        default:
            return state;
    }
  };

  export default imagesReducer;
