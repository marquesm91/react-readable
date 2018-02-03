import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from './actions';
import { Post } from './components';

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
              <Post post={post} />
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
