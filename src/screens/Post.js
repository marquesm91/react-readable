import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { ListItem as SinglePost, List as Comments, FloatButton } from '../components';
import { selectPostObject, getPost, getPostComments, setModal } from '../redux/actions';

const { Content } = Layout;

class Post extends Component {
  componentWillMount() {
    const { post_id } = this.props.match.params;

    this.props.getPost(post_id);
    this.props.getPostComments(post_id);
  }

  componentWillUnmount() {
    this.props.selectPost(null);
  }

  render() {
    const { post, comments, addNewComment } = this.props;

    if (post && post.error) {
      return <Redirect to='/not-found' />;
    }

    return (
      <Content style={{ minHeight: '100vh' }}>
        <SinglePost item={post} loading={!post} />
        <Comments items={comments} onClick={item => console.log(item)} />
        <FloatButton onClick={() => addNewComment(post.id)} />
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
  addNewComment: parentId => dispatch(setModal({ id: parentId, body: '', author: '' })),
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

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);

export { PostConnected as Post };
