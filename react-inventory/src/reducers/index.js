import { combineReducers } from 'redux';
import inventoryReducer from './inventory';

export default combineReducers({
  inventory: inventoryReducer
});
