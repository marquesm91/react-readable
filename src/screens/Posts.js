import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { List as PostList, FloatButton } from '../components';
import { getPosts, getCategoryPosts, setModal } from '../redux/actions';

const { Content } = Layout;

class Posts extends Component {
  async componentWillMount() {
    if (!this.props.posts) {
      const { category } = this.props.match.params;

      category
        ? await this.props.getCategoryPosts(category)
        : await this.props.getPosts();
    }
  }

  onClickPostHandler = post => this.props.history.push(`/${post.category}/${post.id}`);

  render() {
    const { posts, addNewPost } = this.props;

    return (
      <Content style={{ minHeight: '100vh', boxSizing: 'border-box' }}>
        <PostList items={posts} onClick={this.onClickPostHandler} clickable />
        <FloatButton onClick={() => addNewPost()} />
      </Content>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.postsList,
  /*categories: categories.categoriesList,
  category: categories.categorySelected,
  comments: comments.commentsList,
  commentSelected: comments.commentSelected,
  postsOrderBy: posts.orderBy,
  postsOrderDir: posts.orderDir,
  postsSortBy: (posts.orderDir === 'desc' ? '-' : '') + posts.orderBy*/
});

const mapDispatchToProps = dispatch => ({
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  getPosts: () => dispatch(getPosts()),
  addNewPost: () => dispatch(setModal({ title: '', body: '', author: '', category: '' })),
  /*setPostsOrderBy: orderBy => dispatch(setPostsOrderByObject(orderBy)),
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
  selectComment: comment => dispatch(selectCommentObject(comment))*/
});

const PostsConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

export { PostsConnected as Posts };
