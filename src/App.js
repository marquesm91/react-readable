import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import {
  getPosts,
  getCategoryPosts,
  addPost,
  votePost,
  editPost,
  deletePost,
  getPost,
  getCategories,
  addComment
} from './actions';
import { Post } from './components';
import { generateUUID } from './utils';

class App extends Component {
  state = {
    id: null,
    category: null
  }

  componentDidMount() {
    this.props.getCategories();
  }

  getPostHandler = () => {
    this.props.getPost(this.state.id);
  }

  getPostsHandler = () => {
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

  addCommentHandler = async () => {
    await this.props.addComment({
      id: generateUUID(),
      timestamp: Date.now(),
      body: 'This is a comment!!',
      author: 'Matheus',
      parentId: this.state.id
    })
    await this.props.getPosts();

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
    const { posts, categories } = this.props;

    return (
      <div style={{ flex: 1, width: '100%' }}>
        <h1>Hello World!</h1>
        <button onClick={this.addPostHandler}>ADD POST</button>
        <button onClick={this.addCommentHandler}>ADD COMMENT</button>
        <button onClick={this.getPostHandler}>GET POST</button>
        <button onClick={this.getPostsHandler}>GET POSTS</button>
        <button onClick={this.upVotePostHandler}>UP VOTE POST</button>
        <button onClick={this.downVotePostHandler}>DOWN VOTE POST</button>
        <button onClick={this.editPostHandler}>EDIT POST</button>
        <button onClick={this.deletePostHandler}>DELETE POST</button>
        <select onChange={event => this.setState({ category: event.target.value })}>
          <option value="" defaultValue>Select a category...</option>
          {categories.map(category => (
            <option
              key={category.path}
              value={category.path}
            >
              {category.name}
            </option>
          ))}
        </select>
        <ol style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          {posts.length && posts.sort(sortBy('-voteScore')).map(post => (
            <li key={post.id} style={{ cursor: 'pointer' }} onClick={() => this.setState({ id: post.id })}>
              <Post post={post} postStyle={{ 'background': this.state.id === post.id ? '#ffcece' : null }}/>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts,
    categories
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
  getPosts: () => dispatch(getPosts()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  deletePost: id => dispatch(deletePost(id)),
  getCategories: () => dispatch(getCategories()),
  addComment: comment => dispatch(addComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
