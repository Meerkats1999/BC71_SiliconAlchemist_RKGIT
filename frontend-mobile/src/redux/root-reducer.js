import {combineReducers} from 'redux';
import DestinationReducer from './Destination/destination.reducer';

export default combineReducers({
  dest: DestinationReducer,
});
