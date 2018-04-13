import sortBy from 'sort-by';

import {
  SELECT_POST,
  GET_POSTS,
  SET_POST,
  UPDATE_POST_COMMENTCOUNT,
  SET_HOWMANY_POSTS,
  ADD_HOWMANY_POSTS,
  DELETE_HOWMANY_POSTS
} from '../actions';

const initialState = {
  postsList: null,
  postSelected: null,
  howManyPosts: {}
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
    case SET_HOWMANY_POSTS:
      return { ...state, howManyPosts: action.howManyPosts };
    case ADD_HOWMANY_POSTS:
      return {
        ...state,
        howManyPosts: {
          ...state.howManyPosts,
          '/':  state.howManyPosts['/'] + 1,
          [action.postCategory]: state.howManyPosts[action.postCategory] === undefined
            ? 1
            : state.howManyPosts[action.postCategory] + 1
        }
      };
    case DELETE_HOWMANY_POSTS:
      return {
        ...state,
        howManyPosts: {
          ...state.howManyPosts,
          '/': state.howManyPosts['/'] - 1,
          [action.postCategory]: state.howManyPosts[action.postCategory] - 1
        }
      };
    default:
      return state;
  }
};

export default Posts;
