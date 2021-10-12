import { csrfFetch } from './csrf';

const LOAD = 'images/Load';
const ADD_IMAGE = 'images/Add';
const DELETE_IMAGE = '/images/Delete'

const load = (list) => {
    return {
        type: LOAD,
        list
    };
};

const addImage = image => {
    return {
        type:ADD_IMAGE,
        image
    }
}

const deleteImage = imageId => {
    return {
        type: DELETE_IMAGE,
        imageId
    }
}

export const getAllImages = () => async dispatch => {
    const response = await csrfFetch('/api/images');

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const addNewImage = (payload) => async dispatch => {
    const response = await csrfFetch('/api/images', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(newImage));
        return newImage;
    }
}

export const deleteSingleImage = (payload) => async dispatch => {
    const response = await csrfFetch('/api/images', {
        method: 'DELETE',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        dispatch(deleteImage(payload.imageId));
        return true;
    } else {
        return false;
    }
}

const initialState = {
    images: [],
  };

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allImages = {};
            action.list.forEach(image => {
                allImages[image.id] = image;
            });
            return {
                ...state,
              ...allImages,
            };
        case ADD_IMAGE:
            return {
                ...state,
                [action.image.id]: action.image,
            }
        case DELETE_IMAGE:
            const newState = {...state}

            // console.log("**********", newState);
            console.log("**********", newState[action.imageId]);
            delete newState[action.imageId];
            return newState;
        default:
            return state;
    }
  };

  export default imagesReducer;
