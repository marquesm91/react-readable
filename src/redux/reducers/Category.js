import {
  SET_CATEGORY,
  GET_CATEGORIES
} from '../actions';

const initialState = {
  list: null,
  selected: '/'
}
const Categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, selected: action.category };
    case GET_CATEGORIES:
      return { ...state, list: action.categories };
    default:
      return state;
  }
};

export default Categories;
