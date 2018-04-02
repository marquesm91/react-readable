import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { Post, Comment, List } from '../components';
import { selectPostObject, getPost, getPostComments } from '../redux/actions';

const { Content } = Layout;

class PostDetail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
    this.props.getPostComments(id);
  }

  componentWillUnmount() {
    this.props.selectPost(null);
  }

  render() {
    const { post, comments } = this.props;

    if (post && post.error) {
      return <Redirect to='/not-found' />;
    }

    return (
      <Content style={{ margin: '25px', minHeight: '100vh', boxSizing: 'border-box' }}>
        <Post item={post} loading={!post} />
        <List items={comments} item={Comment} onClickItem={comment => console.log(comment)} />
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
  selectPost: post => dispatch(selectPostObject(post)),
  getPost: id => dispatch(getPost(id)),
  getPostComments: id => dispatch(getPostComments(id)),
  /*getPosts: () => dispatch(getPosts()),
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
  selectComment: comment => dispatch(selectCommentObject(comment))*/
});

const PostDetailConnected = connect(mapStateToProps, mapDispatchToProps)(PostDetail);

export { PostDetailConnected as PostDetail };
