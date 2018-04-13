import { url, auth } from '../../api';

export const SELECT_POST = 'SELECT_POST';
export const GET_POSTS = 'GET_POSTS';
export const SET_POST = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST_COMMENTCOUNT = 'UPDATE_POST_COMMENTCOUNT';

const selectPost = post => ({
  type: SELECT_POST,
  post
});

const getPostsObject = posts => ({
  type: GET_POSTS,
  posts
});

const setPostObject = post => ({
  type: SET_POST,
  post
});

export const updatePostCommentCount = (postId, commentDeleted) => ({
  type: UPDATE_POST_COMMENTCOUNT,
  postId,
  commentDeleted
})

export const getPosts = () => dispatch => (
  fetch(`${url}/posts`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(posts => dispatch(getPostsObject(posts)))
)

export const getPost = id => dispatch => (
  fetch(`${url}/posts/${id}`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(post => dispatch(selectPost(post && post.id ? post.id : null)))
)

export const addPost = post => dispatch => (
  fetch(`${url}/posts`, {
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
  fetch(`${url}/posts/${id}`, {
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
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': auth
    }
  })
    .then(res => res.json())
    .then(post => dispatch(setPostObject(post)))
    .then(() => dispatch(selectPost(null)))
)

export const votePost = (id, option) => dispatch => (
  fetch(`${url}/posts/${id}`, {
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
