import { url, auth } from '../../api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_HOWMANY_POSTS = 'SET_HOWMANY_POSTS';

const getCategoriesObject = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const setCategoryObject = category => ({
  type: SET_CATEGORY,
  category
});

export const setHowManyPosts = howManyPosts => ({
  type: SET_HOWMANY_POSTS,
  howManyPosts
});

export const getCategories = () => dispatch => (
  fetch(`${url}/categories`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(res => dispatch(getCategoriesObject(res.categories)))
)
