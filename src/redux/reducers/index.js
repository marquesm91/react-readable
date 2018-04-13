import { combineReducers } from 'redux';
import post from './Post';
import category from './Category';
import comment from './Comment';
import modal from './Modal';
import filter from './Filter';
import search from './Search';
import loader from './Loader';

export default combineReducers({
  post,
  category,
  comment,
  modal,
  filter,
  search,
  loader
});
