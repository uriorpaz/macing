export const TOGGLE_SELECT_MODE = 'TOGGLE_SELECT_MODE';
export const TOGGLE_SINGLE_PHOTO = 'TOGGLE_SINGLE_PHOTO';

export const toggleSelectMode = () => {
  return {
    type: TOGGLE_SELECT_MODE
  };
};

export const toggleSinglePhotoSelection = (id) => {
  return {
    type: TOGGLE_SINGLE_PHOTO,
    payload: id
  };
};
