import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.getPosts()
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
              <h3>{post.title}</h3>
              <h3>{post.timestamp}</h3>
              <h3>{post.author}</h3>
              <h3>{post.category}</h3>
              <h3>{post.voteScore}</h3>
              <h3>{post.deleted}</h3>
              <h3>{post.commentCount}</h3>
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
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
