export const GET_POSTS = 'GET_POSTS';

const getPostsObject = posts => ({
  type: GET_POSTS,
  posts
});

export const getPosts = () => dispatch => (
  fetch('http://localhost:3001/posts', { headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }})
    .then(res => res.json())
    .then(posts => dispatch(getPostsObject(posts)))
)
