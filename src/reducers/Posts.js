import { GET_POST, GET_POSTS, SET_POST, DELETE_POST } from '../actions';

const Posts = (state = [], action) => {
  switch (action.type) {
    case GET_POST:
      return state.filter(post => post.id === action.id);
    case GET_POSTS:
      return action.posts;
    case SET_POST:
      return [ ...state.filter(post => post.id !== action.post.id), { ...action.post }];
    case DELETE_POST:
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
};

export default Posts;
