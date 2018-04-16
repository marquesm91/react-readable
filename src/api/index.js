const url = process.env.NODE_ENV === 'production'
  ? 'https://glacial-coast-87259.herokuapp.com'
  : 'http://localhost:3001';

const auth = 'Basic YWRtaW46YWRtaW43';

export {
  url,
  auth
};
