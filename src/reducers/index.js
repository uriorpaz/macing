import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import { reducer as modalReducer } from 'react-redux-modal';
import facebookLoginReducer from './facebook_login';
import eventDetailsReducer from './event_details';
import galleryReducer from './gallery';

const rootReducer = combineReducers({
  burgerMenu,
  modals: modalReducer,
  facebookUser: facebookLoginReducer,
  currentEvent: eventDetailsReducer,
  gallery: galleryReducer
});

export default rootReducer;
