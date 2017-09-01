import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

//logger will log when ever the state changes.
//thunk allows us to return a promise from an action we dispatch.
const middleware = applyMiddleware(thunk, logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(
  middleware
));
