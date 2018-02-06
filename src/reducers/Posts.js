import { GET_POST, GET_POSTS, SET_POST, DELETE_POST } from '../actions';

const initialState = {
  postsList: [],
  postSelected: null
}

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...state, postSelected: state.postsList.find(post => post.id === action.post.id) };
    case GET_POSTS:
      return { ...state, postsList: action.posts };
    case SET_POST:
      return { ...state, postsList: [...state.postsList.filter(post => post.id !== action.post.id), action.post] };
    case DELETE_POST:
      return { ...state, postsList: state.postsList.filter(post => post.id !== action.post.id) };
    default:
      return state;
  }
};

export default Posts;
