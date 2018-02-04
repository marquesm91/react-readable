import { combineReducers } from 'redux';
import posts from './Posts';
import categories from './Categories';
import comments from './Comments';

export default combineReducers({
  posts,
  categories,
  comments
});
