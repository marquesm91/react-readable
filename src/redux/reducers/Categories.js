import { SET_CATEGORY, GET_CATEGORIES } from '../actions';

const initialState = {
  categoriesList: null,
  categorySelected: ''
}
const Categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, categorySelected: action.category };
    case GET_CATEGORIES:
      return { ...state, categoriesList: action.categories };
    default:
      return state;
  }
};

export default Categories;
