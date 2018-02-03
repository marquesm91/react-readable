import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h1>Hello World!</h1>
        <ol>
          {posts.length && posts.map(post => (
            <li key={post.id}>
              <h2>{post.body}</h2>
              <h4>{post.id}</h4>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
