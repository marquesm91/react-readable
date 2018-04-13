import { combineReducers } from 'redux';
import posts from './Posts';
import categories from './Categories';
import comments from './Comments';
import modal from './Modal';
import filter from './Filter';

export default combineReducers({
  posts,
  categories,
  comments,
  modal,
  filter
});
