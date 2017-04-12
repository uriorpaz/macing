import _ from 'lodash';
import {
  TOGGLE_SELECT_MODE,
  TOGGLE_SINGLE_PHOTO
} from '../actions';

const INITIAL_STATE = { };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SELECT_MODE:
      if (state.isInSelectMode) {
        return { ...state, isInSelectMode: false, selectedPhotos: [] };
      }

      return { ...state, isInSelectMode: true };

    case TOGGLE_SINGLE_PHOTO: {
      if (state.selectedPhotos) {
        const isPhotoSelected =
          state.selectedPhotos &&
          _.includes(state.selectedPhotos, action.payload);

        // remove a photo from selected photos list
        if (isPhotoSelected) {
          return { ...state, selectedPhotos: _.without(state.selectedPhotos, action.payload) };
        }

        // add a photo to selected photos list
        return { ...state, selectedPhotos: [...state.selectedPhotos, action.payload] };
      }

      // add a photo as first photo in selected photos list
      return { ...state, selectedPhotos: [action.payload] };
    }
    
    default:
      return state;
  }
};
