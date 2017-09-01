import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

//logger will log when ever the state changes.
//thunk allows us to return a promise from an action we dispatch.
const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, middleware );
