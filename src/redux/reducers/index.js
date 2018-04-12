import { combineReducers } from 'redux';
import posts from './Posts';
import categories from './Categories';
import comments from './Comments';
import modal from './Modal';

export default combineReducers({
  posts,
  categories,
  comments,
  modal
});
