export const GET_POSTS = 'ADD_RECIPE';

const _getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const getPosts = () => dispatch => (
  fetch('http://localhost:3001/posts', { headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }})
    .then(res => res.json())
    .then(posts => dispatch(_getPosts(posts)))
)
