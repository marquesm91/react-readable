import {
  API_FETCHING
} from '../actions';

const initialState = false;

const Loader = (state = initialState, action) => {
  switch (action.type) {
    case API_FETCHING:
      return action.apiFetching;
    default:
      return state;
  }
};

export default Loader;
