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
  addComment,
  setCategoryObject,
  getPostObject
} from './actions';
import { Post } from './components';
import { generateUUID } from './utils';

class App extends Component {
  async componentDidMount() {
    const { getCategories, getPosts } = this.props;
    await getCategories();
    await getPosts();
  }

  onSelectCategoryHandler = async event => {
    await this.props.setCategory(event.target.value);
    await this.getPostsHandler();
  }

  getPostHandler = () => {
    this.props.getPost(this.props.postSelected.id)
  }

  getPostsHandler = () => {
    this.props.category
     ? this.props.getCategoryPosts(this.props.category)
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
      parentId: this.props.postSelected.id
    })
    await this.props.getPosts();

  }

  editPostHandler = () => {
    this.props.editPost(this.props.postSelected.id, {
      title: 'MY FIRST POST',
      body: 'Using redux!'
    });
  }

  deletePostHandler = () => {
    this.props.deletePost(this.props.postSelected.id);
  }

  upVotePostHandler = () => {
    this.props.votePost(this.props.postSelected.id, "upVote");
  }

  downVotePostHandler = () => {
    this.props.votePost(this.props.postSelected.id, "downVote");
  }

  render() {
    const { posts, categories, postSelected } = this.props;

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
        <select onChange={this.onSelectCategoryHandler}>
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
            <li key={post.id} style={{ cursor: 'pointer' }} onClick={() => this.props.selectPost(post)}>
              <Post post={post} postStyle={{ 'background': postSelected && (postSelected.id === post.id) ? '#ffcece' : null }}/>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories, categorySelected }) => {
  return {
    posts: posts.postsList,
    postSelected: posts.postSelected,
    categories: categories.categoriesList,
    category: categories.categorySelected
  };
};

const mapDispatchToProps = dispatch => ({
  selectPost: post => dispatch(getPostObject(post)),
  getPost: id => dispatch(getPost(id)),
  getPosts: () => dispatch(getPosts()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  setCategory: category => dispatch(setCategoryObject(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  deletePost: id => dispatch(deletePost(id)),
  getCategories: () => dispatch(getCategories()),
  addComment: comment => dispatch(addComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
