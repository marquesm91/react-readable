import { combineReducers } from 'redux';
import posts from './Posts';
import categories from './Categories';

export default combineReducers({
  posts,
  categories
});
