import { url, auth } from '../../api';
import { updatePostCommentCount } from './index';

export const GET_COMMENTS = 'GET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const getCommentsObject = comments => ({
  type: GET_COMMENTS,
  comments
});

const setCommentObject = comment => ({
  type: SET_COMMENT,
  comment
});

export const getPostComments = id => dispatch => (
  fetch(`${url}/posts/${id}/comments`, { headers: { Authorization: auth }})
    .then(res => res.json())
    .then(comments => dispatch(getCommentsObject(comments)))
)

export const addComment = comment => dispatch => (
  fetch(`${url}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(comment => dispatch(setCommentObject(comment)))
    .then(({ comment }) => dispatch(updatePostCommentCount(comment.parentId, comment.deleted)))
)

export const editComment = (id, content) => dispatch => (
  fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(content),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(comment => dispatch(setCommentObject(comment)))
)

export const deleteComment = id => dispatch => (
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': auth
    }
  })
    .then(res => res.json())
    .then(comment => dispatch(setCommentObject(comment)))
    .then(({ comment }) => dispatch(updatePostCommentCount(comment.parentId, comment.deleted)))
)

export const voteComment = (id, option) => dispatch => (
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option }),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(comment => dispatch(setCommentObject(comment)))
)
