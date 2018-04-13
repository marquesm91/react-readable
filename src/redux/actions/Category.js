import { url, auth } from '../../api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';

const getCategoriesObject = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  category
});

export const getCategories = () => dispatch => (
  fetch(`${url}/categories`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(res => dispatch(getCategoriesObject(res.categories)))
)
