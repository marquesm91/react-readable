import { url, auth } from '../api';

export const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategoriesObject = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const getCategories = () => dispatch => (
  fetch(`${url}/categories`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(res => dispatch(getCategoriesObject(res.categories)))
)
