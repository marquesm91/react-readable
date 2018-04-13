import { SET_QUERY } from '../actions';

const initialState = '';

const Search = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return state;
  }
};

export default Search;
