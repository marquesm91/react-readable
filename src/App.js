import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getCategoryPosts, addPost, votePost, editPost, deletePost, getPost } from './actions';
import { Post } from './components';
import { generateUUID } from './utils';

class App extends Component {
  state = {
    id: "",
    category: ""
  }

  getPostHandler = () => {
    this.props.getPost(this.state.id);
  }

  getPostsHandler = () => {
    this.props.getPosts()
  }

  getCategoryPostsHandler = () => {
    this.state.category
     ? this.props.getCategoryPosts(this.state.category)
     : this.props.getPosts();
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

  editPostHandler = () => {
    this.props.editPost(this.state.id, {
      title: 'MY FIRST POST',
      body: 'Using redux!'
    });
  }

  deletePostHandler = () => {
    this.props.deletePost(this.state.id);
  }

  upVotePostHandler = () => {
    this.props.votePost(this.state.id, "upVote");
  }

  downVotePostHandler = () => {
    this.props.votePost(this.state.id, "downVote");
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={this.addPostHandler}>ADD POST</button>
        <button onClick={this.getPostHandler}>GET POST</button>
        <button onClick={this.getCategoryPostsHandler}>GET CATEGORY POSTS</button>
        <button onClick={this.getPostsHandler}>GET POSTS</button>
        <button onClick={this.upVotePostHandler}>UP VOTE POST</button>
        <button onClick={this.downVotePostHandler}>DOWN VOTE POST</button>
        <button onClick={this.editPostHandler}>EDIT POST</button>
        <button onClick={this.deletePostHandler}>DELETE POST</button>
        <input
          type="text"
          placeholder="ID"
          value={this.state.id}
          onChange={event => this.setState({ id: event.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={this.state.category}
          onChange={event => this.setState({ category: event.target.value })}
        />
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
  getPost: id => dispatch(getPost(id)),
  getPosts: () => dispatch(getPosts()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  deletePost: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
