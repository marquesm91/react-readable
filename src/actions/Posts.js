import { url, auth, posts } from '../api';

export const GET_POSTS = 'GET_POSTS';

const getPostsObject = posts => ({
  type: GET_POSTS,
  posts
});

export const getPosts = () => dispatch => (
  fetch(`${url}${posts}`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(posts => dispatch(getPostsObject(posts)))
)
