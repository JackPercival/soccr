import { csrfFetch } from './csrf';

const LOAD = 'images/Load';
const ADD_IMAGE = 'images/Add'

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

export const getAllImages = () => async dispatch => {
    const response = await csrfFetch('/api/images');

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const addNewImage = (payload) => async dispatch => {
    console.log(payload)
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

const initialState = {
    images: [],
  };

const imagesReducer = (state = initialState, action) => {
    // let newState;
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
        case ADD_IMAGE: {
            return {
                ...state,
                [action.image.id]: action.image,
            }
        }
        default:
            return state;
    }
  };

  export default imagesReducer;
