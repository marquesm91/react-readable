import sortBy from 'sort-by';

import {
  GET_COMMENTS,
  SET_COMMENT
} from '../actions';

const initialState = {
  commentsList: null
}

const Comments = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, commentsList: action.comments.sort(sortBy('-voteScore')) };
    case SET_COMMENT:
      return {
        ...state,
        commentsList: [
          ...state.commentsList.filter(comment => comment.id !== action.comment.id),
          action.comment
        ].sort(sortBy('-voteScore'))
      };
    default:
      return state;
  }
};

export default Comments;
