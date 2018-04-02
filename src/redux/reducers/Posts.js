import {
  SET_POSTS_ORDER_BY,
  SET_POSTS_ORDER_DIR,
  SELECT_POST,
  GET_POST,
  GET_POSTS,
  SET_POST,
  DELETE_POST
} from '../actions';

const initialState = {
  postsList: [],
  postSelected: null,
  orderBy: 'voteScore',
  orderDir: 'desc'
}

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_ORDER_BY:
      return { ...state, orderBy: action.orderBy };
    case SET_POSTS_ORDER_DIR:
      return { ...state, orderDir: action.orderDir };
    case SELECT_POST:
      return { ...state, postSelected: action.post };
    case GET_POST:
      return { ...state, postSelected: action.post };
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
