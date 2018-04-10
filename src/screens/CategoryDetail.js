import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { Post, List } from '../components';
import { getPosts, getCategoryPosts } from '../redux/actions';

const { Content } = Layout;

class CategoryDetail extends Component {
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
    const { posts } = this.props;

    return (
      <Content style={{ minHeight: '100vh', boxSizing: 'border-box' }}>
        <List items={posts} item={Post} onClickItem={this.onClickPostHandler} clickable />
      </Content>
    );
  }
}

const mapStateToProps = ({ posts, categories, comments }) => {
  return {
    posts: posts.postsList,
    post: posts.postSelected,
    comments: comments.commentsList
    /*categories: categories.categoriesList,
    category: categories.categorySelected,
    comments: comments.commentsList,
    commentSelected: comments.commentSelected,
    postsOrderBy: posts.orderBy,
    postsOrderDir: posts.orderDir,
    postsSortBy: (posts.orderDir === 'desc' ? '-' : '') + posts.orderBy*/
  };
};

const mapDispatchToProps = dispatch => ({
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  getPosts: () => dispatch(getPosts())
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

const CategoryDetailConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryDetail));

export { CategoryDetailConnected as CategoryDetail };
