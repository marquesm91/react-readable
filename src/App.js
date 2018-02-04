import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getCategoryPosts, addPost, votePost, editPost } from './actions';
import { Post } from './components';
import { generateUUID } from './utils';

class App extends Component {
  state = {
    id: ""
  }

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

  editPostHandler = () => {
    this.props.editPost(this.state.id, {
      title: 'MY FIRST POST',
      body: 'Using redux!'
    });
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
        <button onClick={this.getPostsHandler}>GET POSTS</button>
        <button onClick={this.upVotePostHandler}>UP VOTE POST</button>
        <button onClick={this.downVotePostHandler}>DOWN VOTE POST</button>
        <button onClick={this.editPostHandler}>EDIT POST</button>
        <input
          type="text"
          value={this.state.id}
          onChange={event => this.setState({ id: event.target.value })}
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
  getPosts: () => dispatch(getPosts()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
