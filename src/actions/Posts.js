import { url, auth, posts } from '../api';

export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const SET_POST = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';

const getPostsObject = posts => ({
  type: GET_POSTS,
  posts
});

const setPostObject = post => ({
  type: SET_POST,
  post
});

export const getPosts = () => dispatch => (
  fetch(`${url}/${posts}`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(posts => dispatch(getPostsObject(posts)))
)

export const getCategoryPosts = category => dispatch => (
  fetch(`${url}/${category}/${posts}`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(posts => dispatch(getPostsObject(posts)))
)

export const addPost = post => dispatch => (
  fetch(`${url}/${posts}`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(post => {console.log(post); dispatch(setPostObject(post))})
)
