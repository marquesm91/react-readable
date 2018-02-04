import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getCategoryPosts, addPost } from './actions';
import { Post } from './components';
import { generateUUID } from './utils';

class App extends Component {
  getPostsHandler = () => {
    this.props.getPosts()
  }

  addPostHandler = () => {
    this.props.addPost({
      id: generateUUID(),
      timestamp: Date.now(),
      title: 'My first Post',
      body: 'Using redux!',
      author: 'Matheus',
      category: 'redux'
    });
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={this.addPostHandler}>ADD POST</button>
        <button onClick={this.getPostsHandler}>GET POSTS</button>
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
  getPosts: () => dispatch(getPosts()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  addPost: post => dispatch(addPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
