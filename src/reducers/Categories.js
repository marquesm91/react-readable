import { GET_CATEGORIES } from '../actions';

const Categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default Categories;
