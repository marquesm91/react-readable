import { url, auth } from '../../api';

export const GET_POSTS = 'GET_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const SET_POST = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST_COMMENTCOUNT = 'UPDATE_POST_COMMENTCOUNT';
export const SET_HOWMANY_POSTS = 'SET_HOWMANY_POSTS';
export const ADD_HOWMANY_POSTS = 'ADD_HOWMANY_POSTS';
export const DELETE_HOWMANY_POSTS = 'DELETE_HOWMANY_POSTS';

const getPostsObject = posts => ({
  type: GET_POSTS,
  posts
});

export const selectPost = post => ({
  type: SELECT_POST,
  post
});

const setPostObject = post => ({
  type: SET_POST,
  post
});

const deletePostObject = post => ({
  type: DELETE_POST,
  post
});

export const updatePostCommentCount = (postId, commentDeleted) => ({
  type: UPDATE_POST_COMMENTCOUNT,
  postId,
  commentDeleted
});

const setHowManyPosts = categoryCount => ({
  type: SET_HOWMANY_POSTS,
  categoryCount
});

const addHowManyPosts = postCategory => ({
  type: ADD_HOWMANY_POSTS,
  postCategory
});

const deleteHowManyPosts = postCategory => ({
  type: DELETE_HOWMANY_POSTS,
  postCategory
});

export const getPosts = () => dispatch => (
  fetch(`${url}/posts`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(posts => {
      const categoryCount = posts.reduce((acc, cur) => {
        if (!acc['/']) {
          acc['/'] = 0;
        }
        if (!acc[cur.category]) {
          acc[cur.category] = 0;
        }

        acc[cur.category]++;
        acc['/']++;
        return acc;
      }, {});

      dispatch(setHowManyPosts(categoryCount));
      return dispatch(getPostsObject(posts));
    })
)

export const getPost = id => dispatch => (
  fetch(`${url}/posts/${id}`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(post => dispatch(selectPost(post && post.id ? post.id : -1)))
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
    .then(post => {
      dispatch(addHowManyPosts(post.category));
      return dispatch(setPostObject(post))
    })
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
    .then(post => {
      dispatch(deleteHowManyPosts(post.category));
      // wait 1sec to components re-render and then delete post completed from redux state
      return dispatch(deletePostObject(post));
    })
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
