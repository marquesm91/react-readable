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

const deletePostObject = post => ({
  type: DELETE_POST,
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
    .then(post => dispatch(setPostObject(post)))
)

export const editPost = (id, content) => dispatch => (
  fetch(`${url}/${posts}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(content),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(post => dispatch(setPostObject(post)))
)

export const deletePost = id => dispatch => (
  fetch(`${url}/${posts}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': auth
    }
  })
    .then(res => res.json())
    .then(post => dispatch(deletePostObject(post)))
)

export const votePost = (id, option) => dispatch => (
  fetch(`${url}/${posts}/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option }),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(post => dispatch(setPostObject(post)))
)
