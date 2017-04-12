import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = composeWithDevTools(
  applyMiddleware(ReduxPromise),
  applyMiddleware(ReduxThunk),
);

export default createStore(reducers, middlewares);
