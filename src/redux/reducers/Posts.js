import sortBy from 'sort-by';

import {
  SELECT_POST,
  GET_POSTS,
  SET_POST,
  UPDATE_POST_COMMENTCOUNT
} from '../actions';

const initialState = {
  postsList: null,
  postSelected: null
}

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_POST:
      return { ...state, postSelected: action.post };
    case GET_POSTS:
      return { ...state, postsList: action.posts.sort(sortBy('-voteScore')) };
    case SET_POST:
      return {
        ...state,
        postsList: [
          ...state.postsList.filter(post => post.id !== action.post.id),
          action.post
        ].sort(sortBy('-voteScore'))
      };
    case UPDATE_POST_COMMENTCOUNT:
      const postToUpdate = state.postsList.find(post => post.id === action.postId)
      return {
        ...state,
        postsList: [
          ...state.postsList.filter(post => post.id !== action.postId),
          {
            ...postToUpdate,
            commentCount: action.commentDeleted ? (postToUpdate.commentCount - 1) : (postToUpdate.commentCount + 1)
          }
        ].sort(sortBy('-voteScore'))
      };
    default:
      return state;
  }
};

export default Posts;
