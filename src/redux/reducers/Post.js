import sortBy from 'sort-by';
import {
  SELECT_POST,
  GET_POSTS,
  SET_POST,
  DELETE_POST,
  UPDATE_POST_COMMENTCOUNT,
  SET_HOWMANY_POSTS,
  ADD_HOWMANY_POSTS,
  DELETE_HOWMANY_POSTS
} from '../actions';

const initialState = {
  list: [],
  selected: null,
  categoryCount: {}
}

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST:
      return { ...state, list: state.list.filter(post => post.id !== action.post.id) };
    case SELECT_POST:
      return { ...state, selected: action.post };
    case GET_POSTS:
      return { ...state, list: action.posts.sort(sortBy('-voteScore')) };
    case SET_POST:
      return {
        ...state,
        list: [
          ...state.list.filter(post => post.id !== action.post.id),
          action.post
        ].sort(sortBy('-voteScore'))
      };
    case UPDATE_POST_COMMENTCOUNT:
      const postToUpdate = state.list.find(post => post.id === action.postId)
      return {
        ...state,
        list: [
          ...state.list.filter(post => post.id !== action.postId),
          {
            ...postToUpdate,
            commentCount: action.commentDeleted ? (postToUpdate.commentCount - 1) : (postToUpdate.commentCount + 1)
          }
        ].sort(sortBy('-voteScore'))
      };
    case SET_HOWMANY_POSTS:
      return { ...state, categoryCount: action.categoryCount };
    case ADD_HOWMANY_POSTS:
      return {
        ...state,
        categoryCount: {
          ...state.categoryCount,
          '/': state.categoryCount['/'] === undefined
            ? 1
            : state.categoryCount['/'] + 1,
          [action.postCategory]: state.categoryCount[action.postCategory] === undefined
            ? 1
            : state.categoryCount[action.postCategory] + 1
        }
      };
    case DELETE_HOWMANY_POSTS:
      return {
        ...state,
        categoryCount: {
          ...state.categoryCount,
          '/': state.categoryCount['/'] - 1,
          [action.postCategory]: state.categoryCount[action.postCategory] - 1
        }
      };
    default:
      return state;
  }
};

export default Posts;
