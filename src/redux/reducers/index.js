import { combineReducers } from 'redux';
import posts from './Posts';
import categories from './Categories';
import comments from './Comments';
import modal from './Modal';
import filter from './Filter';
import search from './Search';
import loader from './Loader';

export default combineReducers({
  posts,
  categories,
  comments,
  modal,
  filter,
  search,
  loader
});
