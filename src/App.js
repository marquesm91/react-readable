import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import { Button } from 'antd';
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
  voteComment,
  getPostComments,
  setCategoryObject,
  selectPostObject,
  selectCommentObject,
  setPostsOrderByObject,
  setPostsOrderDirObject
} from './redux/actions';
import { Post, Comment, Icon } from './components';
import { generateUUID } from './utils';

class App extends Component {
  async componentDidMount() {
    await this.props.getCategories();
    await this.props.getPosts();
  }

  onSelectCategoryHandler = async event => {
    await this.props.setCategory(event.target.value);
    this.getPostsHandler();
  }

  onSelectPostHandler = async post => {
    await this.props.selectPost(post);
    await this.props.getPostComments(post.id);
  }

  onSelectCommentHandler = comment => {
    this.props.selectComment(comment);
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

  addCommentHandler = () => {
    this.props.addComment({
      id: generateUUID(),
      timestamp: Date.now(),
      body: 'This is a comment!!',
      author: 'Matheus',
      parentId: this.props.postSelected.id
    })
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

  upVoteCommentHandler = () => {
    this.props.voteComment(this.props.commentSelected.id, "upVote");
  }

  downVoteCommentHandler = () => {
    this.props.voteComment(this.props.commentSelected.id, "downVote");
  }

  orderByHandler = event => {
    this.props.setPostsOrderBy(event.target.value)
    this.getPostsHandler();
  }

  orderDirHandler = () => {
    this.props.postsOrderDir === 'desc'
      ? this.props.setPostsOrderDir('asc')
      : this.props.setPostsOrderDir('desc')
    this.getPostsHandler();
  }

  render() {
    const { posts, categories, postSelected, comments, commentSelected, postsSortBy, postsOrderDir } = this.props;

    return (
      <div style={{ flex: 1, width: '100%' }}>
        <h1>Hello World!</h1>
        <Button onClick={this.addPostHandler}>ADD POST</Button>
        <button onClick={this.addCommentHandler}>ADD COMMENT</button>
        <button onClick={this.getPostHandler}>GET POST</button>
        <button onClick={this.getPostsHandler}>GET POSTS</button>
        <button onClick={this.upVotePostHandler}>UP VOTE POST</button>
        <button onClick={this.downVotePostHandler}>DOWN VOTE POST</button>
        <button onClick={this.upVoteCommentHandler}>UP VOTE COMMENT</button>
        <button onClick={this.downVoteCommentHandler}>DOWN VOTE COMMENT</button>
        <button onClick={this.editPostHandler}>EDIT POST</button>
        <button onClick={this.deletePostHandler}>DELETE POST</button>
        <Icon name={postsOrderDir === 'desc' ? 'arrow-down' : 'arrow-up'} onClick={this.orderDirHandler} />
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
        <select onChange={this.orderByHandler}>
          <option value="voteScore" defaultValue>vote score</option>
          <option value="title">title</option>
          <option value="timestamp">timestamp</option>
          <option value="author">author</option>
        </select>
        <ol style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          {posts.length && posts.sort(sortBy(postsSortBy)).map(post => (
            <div key={post.id}>
              <li style={{ cursor: 'pointer' }} onClick={() => this.onSelectPostHandler(post)}>
                <Post post={post} postStyle={{ 'background': postSelected && (postSelected.id === post.id) ? '#ffcece' : null }}/>
              </li>
              <ol style={{ listStyleType: 'none', padding: '0', margin: '10px 30px' }}>
                {comments.length && comments[0].parentId === post.id && comments.sort(sortBy('-voteScore')).map(comment => (
                  <li key={comment.id} style={{ cursor: 'pointer' }} onClick={() => this.onSelectCommentHandler(comment)}>
                    <Comment comment={comment} commentStyle={{ 'background': commentSelected && (commentSelected.id === comment.id) ? '#ceffce' : null }}/>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories, comments }) => {
  return {
    posts: posts.postsList,
    postSelected: posts.postSelected,
    categories: categories.categoriesList,
    category: categories.categorySelected,
    comments: comments.commentsList,
    commentSelected: comments.commentSelected,
    postsOrderBy: posts.orderBy,
    postsOrderDir: posts.orderDir,
    postsSortBy: (posts.orderDir === 'desc' ? '-' : '') + posts.orderBy
  };
};

const mapDispatchToProps = dispatch => ({
  selectPost: post => dispatch(selectPostObject(post)),
  getPost: id => dispatch(getPost(id)),
  getPosts: () => dispatch(getPosts()),
  setPostsOrderBy: orderBy => dispatch(setPostsOrderByObject(orderBy)),
  setPostsOrderDir: orderDir => dispatch(setPostsOrderDirObject(orderDir)),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  setCategory: category => dispatch(setCategoryObject(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  deletePost: id => dispatch(deletePost(id)),
  getCategories: () => dispatch(getCategories()),
  addComment: comment => dispatch(addComment(comment)),
  voteComment: (id, comment) => dispatch(voteComment(id, comment)),
  getPostComments: id => dispatch(getPostComments(id)),
  selectComment: comment => dispatch(selectCommentObject(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
