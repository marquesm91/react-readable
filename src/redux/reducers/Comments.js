import sortBy from 'sort-by';

import {
  SELECT_COMMENT,
  GET_COMMENT,
  GET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT
} from '../actions';

const initialState = {
  commentsList: [],
  commentSelected: {}
}

const Comments = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_COMMENT:
      return { ...state, commentSelected: action.comment };
    case GET_COMMENT:
      return { ...state, commentSelected: state.commentsList.find(comment => comment.id === action.comment.id) };
    case GET_COMMENTS:
      return { ...state, commentsList: action.comments.sort(sortBy('-voteScore')) };
    case SET_COMMENT:
      return {
        ...state,
        commentsList: [...state.commentsList.filter(comment => comment.id !== action.comment.id), action.comment].sort(sortBy('-voteScore'))
      };
    case DELETE_COMMENT:
      return { ...state, commentsList: state.commentsList.filter(comment => comment.id !== action.comment.id) };
    default:
      return state;
  }
};

export default Comments;
