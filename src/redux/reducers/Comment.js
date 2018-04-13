import sortBy from 'sort-by';
import {
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT
} from '../actions';

const initialState = [];

const Comments = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id)
    case SET_COMMENTS:
      return action.comments.sort(sortBy('-voteScore'));
    case SET_COMMENT:
      return [
        ...state.filter(comment => comment.id !== action.comment.id),
        action.comment
      ].sort(sortBy('-voteScore'));
    default:
      return state;
  }
};

export default Comments;
