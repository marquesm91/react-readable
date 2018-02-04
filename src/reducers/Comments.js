import { GET_COMMENT, GET_COMMENTS, SET_COMMENT, DELETE_COMMENT } from '../actions';

const Comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENT:
      return state.filter(comment => comment.id === action.comment.id);
    case GET_COMMENTS:
      return action.comments;
    case SET_COMMENT:
      return [...state.filter(comment => comment.id !== action.comment.id), action.comment]
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id);
    default:
      return state;
  }
};

export default Comments;
