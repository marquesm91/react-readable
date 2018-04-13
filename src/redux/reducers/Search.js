import {
  SET_QUERY_SEARCH
} from '../actions';

const initialState = '';

const Search = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY_SEARCH:
      return action.query;
    default:
      return state;
  }
};

export default Search;
