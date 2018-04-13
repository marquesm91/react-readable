import {
  SELECT_POST,
  GET_POST,
  GET_POSTS,
  GET_CATEGORY_POSTS,
  SET_POST,
  DELETE_POST,
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
    case GET_POST:
      return { ...state, postSelected: action.post };
    case GET_POSTS:
      return { ...state, postsList: action.posts };
    case GET_CATEGORY_POSTS:
      return { ...state, postsList: action.posts };
    case SET_POST:
      return {
        ...state,
        postsList: [...state.postsList.filter(post => post.id !== action.post.id), action.post]
      };
    case DELETE_POST:
      return {
        ...state,
        postsList: state.postsList && state.postsList.filter(post => post.id !== action.post.id)
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
        ]
      };
    default:
      return state;
  }
};

export default Posts;
