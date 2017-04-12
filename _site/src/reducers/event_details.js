import _ from 'lodash';

import {
  GET_EVENT_DETAILS,
  GET_EVENT_PHOTOS,
  GET_EVENT_PHOTOS_DONE
} from '../actions';

const INITIAL_STATE = { };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENT_DETAILS:
      return { ...state, event: action.payload.data };
    case GET_EVENT_PHOTOS:
      return { ...state, isLoadingPhotos: true };
    case GET_EVENT_PHOTOS_DONE: {
      const {
        TotalResults,
        PageNumber,
        PageSize,
        HasNextPage,
        Photos
      } = action.payload.data;


      const photos = state.photos ?
        _.uniq(_.flatten([state.photos, Photos]), p => { return p.Id; }) : Photos;

      return {
        ...state,
        photos,
        isLoadingPhotos: false,
        pageNumber: PageNumber,
        pageSize: PageSize,
        totalResults: TotalResults,
        hasNextPage: HasNextPage
      };
    }
    default:
      return state;
  }
};
